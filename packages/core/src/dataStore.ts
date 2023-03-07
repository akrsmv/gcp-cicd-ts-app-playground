import { DownloadResponse, TransferManager } from '@google-cloud/storage'
import { createInterface } from 'readline/promises'
import { PassThrough } from 'stream'
import { GetDataRequest } from './interfaces-public'
import { GctDataKind, GetDataInput } from './interfaces-private'
import { datePattern, validateInputDate, withZero, dateToYmd, ymdToUTCDate } from './utils'
import { getGcsBucket, getMemoryStoreClient } from './serviceClients'
import { generateSampleFiles, removeSampleFiles, _loadFilesFromLocalMachine } from './_devtools'
import { GctError, GctErrorMessage } from './errors'
import { TimeSeriesAggregationType } from 'redis'
import { logerror } from './log'
import { RangeOptions } from '@redis/time-series/dist/commands'

/**
 * Validate and Transform incoming request
 * @param req
 */
export const validateRequest = (req: GetDataRequest): GetDataInput => {
    // get number representation of optional relative time params
    const daysBack = Number(req.daysBack),
        monthsBack = Number(req.monthsBack),
        yearsBack = Number(req.yearsBack),
        limit = Number(req.limit)


    // verify requested date
    const result: GetDataInput = { end: validateInputDate({ ...req, setDefaultStartDate: true }) }

    // if request is for start-end range, validate the end date also
    if (req.range) {
        const matched = datePattern.exec(req.range)?.groups
        if (matched) {
            result.start = validateInputDate({
                year: matched.year,
                month: matched.month,
                day: matched.day,
                callerStr: "end date param",
                setDefaultStartDate: false
            })
        }
    } else if (daysBack) {
        const endDate = ymdToUTCDate(result.end)
        result.start = dateToYmd(endDate.setDate(endDate.getDate() - daysBack))
    } else if (monthsBack) {
        const endDate = ymdToUTCDate(result.end)
        result.start = dateToYmd(new Date(endDate.setMonth(endDate.getMonth() - monthsBack)).setDate(1))
    } else if (yearsBack) {
        const endDate = ymdToUTCDate(result.end)
        result.start = dateToYmd(new Date(new Date(endDate.setFullYear(endDate.getFullYear() - yearsBack)).setMonth(0)).setDate(1))
    }

    if (limit && !Number.isNaN(limit)) {
        result.limit = limit
    }
    
    return result
}

const prepareTSRangeOptions = (input: GetDataInput) => {
    if (input.limit) {
        return {
            COUNT: input.limit
        }
    }
    return undefined
}

/**
 * 
 * @param params 
 * @returns 
 * price data in requested range. If there is no range, i.e `params.range` is undefined, returns data only for the `start` date
 */
export const getGctTSData = async (type: GctDataKind, params: GetDataRequest) => {
    const input: GetDataInput = validateRequest(params)
    const rangeOptions: RangeOptions | undefined = prepareTSRangeOptions(input)

    const end = new Date(`${input.end.year}-${withZero(input.end.month)}-${withZero(input.end.day)}T23:59:59.999Z`).getTime().toString()
    let start: string = new Date(`${input.end.year}-${withZero(input.end.month)}-${withZero(input.end.day)}T00:00:00.000Z`).getTime().toString()
    if (input.start) {
        start = new Date(`${input.start.year}-${withZero(input.start.month)}-${withZero(input.start.day)}T00:00:00.000Z`).getTime().toString()
    }
    return await getMemoryStoreClient().ts.range(`${type.indexName}:${type.unit}`, start, end, rangeOptions)
}

/**
 * keeps the redis keys and rules we use so far
 * @param index 
 */
export const recreateIndex = async (indexInfo: GctDataKind) => {
    try {
        await getMemoryStoreClient().del(`${indexInfo.indexName}:${indexInfo.unit}`)
        await getMemoryStoreClient().del(`${indexInfo.indexName}:daily_avg:${indexInfo.unit}`)
        await getMemoryStoreClient().ts.create(`${indexInfo.indexName}:${indexInfo.unit}`)
        await getMemoryStoreClient().ts.create(`${indexInfo.indexName}:daily_avg:${indexInfo.unit}`)
        await getMemoryStoreClient().ts.createRule(
            `${indexInfo.indexName}:${indexInfo.unit}`,
            `${indexInfo.indexName}:daily_avg:${indexInfo.unit}`,
            TimeSeriesAggregationType.AVG, 12)
    } catch (err) {
        logerror(`Error recreating keys and rules for ${indexInfo.indexName}:${indexInfo.unit} `, err)
        throw new GctError("GCTE502", GctErrorMessage.GCTE502)
    }
}

/**
 * Rebuilds a redis stream.
 * First, downloads data from GCS, and
 * sorts it by timestamp (since the stream requires ordered additions)
 * 
 * Once the data is sorted and ready to be added in redis, deletes the existing index, 
 * and recreates it with the freshly downloaded data
 *  
 * @param index name of redis stream key
 */
export const rebuildIndex = async (indexInfo: GctDataKind, useLocalfs: boolean, generateSampleFilesPayload?: any): Promise<void> => {
    if (!indexInfo.indexName || !indexInfo.unit) {
        throw new GctError("GCTE50", GctErrorMessage["GCTE501"])
    }

    await recreateIndex(indexInfo)

    let files: void | DownloadResponse[]
    // BEWARE 
    // data in buckets is not organized under different units,
    // therefore passing only indexName below
    if (useLocalfs) {
        if (generateSampleFilesPayload) {
            // so request is for generating test data first

            // remove any old generated, since if the range requested is smaller, 
            // those files will stay and data will be loaded into index as well
            await removeSampleFiles(indexInfo)
            // then generate newly requested
            await generateSampleFiles(generateSampleFilesPayload)
        }
        // simulate download from GCS
        files = await _loadFilesFromLocalMachine(indexInfo.indexName) as unknown as DownloadResponse[]
    } else {
        // download from GCS
        const transferManager = new TransferManager(getGcsBucket())
        files = await transferManager.downloadManyFiles(indexInfo.indexName)
    }

    //#region  ONLY NEEDED IF USING STREAMS (see below ts.ADD instead of .XADD)
    // convert numeric keys to strings befre sending via node-redis
    // https://github.com/redis/node-redis/issues/1808
    // https://github.com/redis/node-redis/issues/2019#issuecomment-1445349845
    // TODO make replacer/reviver as mappers by GctDataKind objects
    // function replacer(key: string, value: any) {
    //     // Filtering out properties
    //     if (typeof value === "number") {
    //         return value.toString();
    //     }
    //     return value;
    // }
    // // transform json, leaving only time and value keys
    // function reviver(this: any, key: any, value: any) {
    //     if (key === "timestamp") { this.x = value; return undefined }
    //     if (key === "kwh") { this.y = value; return undefined }
    //     else if (key === "price") { this.y = value; return undefined }
    //     return typeof value === 'object' ? value : undefined
    // }
    //#endregion

    if (files && files.length) {
        const mapUnsorted = new Map<number, any>
        await Promise.all(files
            .map(async file => {
                const jsonlinesGen = readBufferInLines(file)
                for await (const jsonline of jsonlinesGen) {
                    const pricePoint = JSON.parse(jsonline)
                    mapUnsorted.set(pricePoint.timestamp, pricePoint)
                }
            }))

        const mapSorted = new Map([...mapUnsorted.entries()].sort());

        for (const valuePoint of mapSorted.values()) {
            // NB! previous approuch, where replacer/reviver was needed, because redis wanted string values only
            // getRedisClient().xAdd(`${indexInfo.indexName}:${indexInfo.unit}`, String(pricePoint.timestamp), JSON.parse(JSON.stringify(pricePoint, replacer), reviver))

            // NB! 
            // adding either of price or kwh is present, just for this method to support both price and usage, not to branch it 
            getMemoryStoreClient().ts.ADD(`${indexInfo.indexName}:${indexInfo.unit}`, valuePoint.timestamp, valuePoint.price ?? valuePoint.kwh)
        }
    }
}

/**
 * Generates a string for each new line in Buffer
 * @param buffers array of Buffers, each representing one jsonl data file 
 */
async function* readBufferInLines(buffers: Buffer[]): AsyncGenerator<string, void, void> {
    for (const input of buffers) {
        const bufferedStream = new PassThrough()
        bufferedStream.end(input)
        for await (const line of createInterface({ input: bufferedStream })) {
            yield line
        }
    }
}