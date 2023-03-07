import { GetFilesOptions } from "@google-cloud/storage"
import { R_OK } from "constants"
import { createWriteStream } from "fs"
import { access, mkdir, opendir, readFile, rm, writeFile } from "fs/promises"
import { dirname, join } from "path"
import { recreateIndex } from "./dataStore"
import { GctDataKind, GetDataInput } from "./interfaces-private"
import { logwarn } from "./log"
import { getGcsBucket } from "./serviceClients"
import { strToYmd, withZero, ymdToUTCDate } from "./utils"

const _cacheDir = process.env.LOCAL_TESTDATA_DIRNAME || "localdev_files/bucket_queries_cache"
const _bucketDownloadDir = process.env.BUCKET_CACHE_DIRNAME || "__GCS"

export const _loadFilesFromLocalMachine = async (startDir: string): Promise<[Buffer][]> => {
    const dirPath = join(_cacheDir,startDir)
    try {
        await access(dirPath, R_OK)
        return await loadJsonFiles(dirPath)
    } catch {
        logwarn('no cached data for ', dirPath, '. Cannot load from local machine')
    }
    return []
}

/**
 * Looks for cached query results in local cache 
 * Returns JSON data if cache found, otherwise undefined
 * @param path 
 */
const loadJsonFiles = async (startDir: string) => {
    let files: [Buffer][] = []
    const gen = dirFilesGenerator(startDir)
    for await (const file of gen) {
        if (file.endsWith(".jsonl")) {
            files.push([await readFile(file)])
        }
    }
    return files
}

interface GenerateSampleData {
    start: string,
    end: string,
    randValueKey: string,
    randValueRange: [number, number],
    prefix: string,
    additionalProps?: Record<string, number | string>
    tickStep: number
}
/**
 * Generates jsonlines on local filesystem
 * 
 * @param params What sample data to generate
 * @returns
 */
export const generateSampleFiles = async (params: GenerateSampleData) => {
    const { prefix, tickStep } = params

    const dateRange: GetDataInput = {
        start: strToYmd(params.start, true),
        end: strToYmd(params.end, true)
    }
    for await (const [forDay, fileKey] of gcsKeysGenerator(dateRange, prefix)) {
        await mkdir(dirname(join(_cacheDir, fileKey)), { recursive: true })
        const dailyDataStream = createWriteStream(join(_cacheDir, fileKey))
        for await (const [timestamp, jsonline] of generateOneDaySampleData(forDay, params)) {
            await dailyDataStream.write( // append new line only if not last sample for this day
                JSON.stringify(jsonline) + (forDay.getTime() + 24 * 60 * 60 * 1000 - timestamp > tickStep ? '\n' : ''))
        }
        dailyDataStream.end();
    }
}

export const removeSampleFiles = async (indexInfo: GctDataKind) => {
    await recreateIndex(indexInfo)
    await rm(dirname(join(_cacheDir)),{recursive: true, force: true})
}

const ticksRange = (forDay: Date, step: number) => {
    const dayStartMilis = forDay.getTime()
    return arrayRange(dayStartMilis, dayStartMilis + 24 * 60 * 60 * 1000 - 1, step)
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function randomInRange(min: number, max: number) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

function* generateOneDaySampleData(forDay: Date, params: GenerateSampleData): Generator<[number, Record<string, string | number>], void, void> {
    const { randValueKey, randValueRange, additionalProps, tickStep } = params
    for (const tick of ticksRange(forDay, tickStep)) {
        yield [tick, {
            timestamp: tick,
            [randValueKey]: randomInRange(...randValueRange),
            ...additionalProps
        }]
    }
}

/**
 * Recursivly yields files from a child directory tree
 * @param path Starting directory path
 */
export async function* dirFilesGenerator(path: string): AsyncGenerator<string, void, void> {
    const dirIterator = await opendir(path)
    for await (const dirent of dirIterator) {
        if (dirent.isDirectory()) {
            yield* dirFilesGenerator(join(path, dirent.name))
        } else {
            yield join(path, dirent.name)
        }
    }
}

/**
 * Downloads files from cloud strage
 * 
 * CAUTION! 
 * Not passing any query options will recursivly pull all files from the bucket
 * @param bucket 
 * @param query 
 */
export const batchGetFiles = async (query?: GetFilesOptions): Promise<void> => {
    const [files] = await getGcsBucket().getFiles({ ...query });
    if (files.length) {
        await Promise.all(files
            .filter(file => !file.name.endsWith("/"))
            .map(async file => {
                const cachedPath = join(_bucketDownloadDir, file.name)
                await mkdir(dirname(cachedPath), { recursive: true })
                await writeFile(cachedPath, await file.download())
            }))
    }
}

//#region gcs keys generator

/**
 * Maximum of 5 years of data allowed
 * @param req 
 * @param prefix to prefix each generated key
 * @returns When `req.end` is not defined, a single key. Example:
 * ```
 * req = {start: {year: 2022, month: 1, day: 5} }
 * ``` 
 * Results in
 * ```
 * {prefix}/2022/01/05.jsonl
 * ```
 * @returns When `req.end` is defined, list of all keys in range between `start` and `end`. Example
 *  
 * ``` 
 * req = {start: {year: 2022, month: 1, day: 5}, end: {year: 2023, month: 2, day: 26} }
 * ``` 
 * Results in
 * 
 * ```
 * [
 *  "{prefix}/2022/01/05.jsonl"
 *  "{prefix}/2022/01/06.jsonl"
 *  "{prefix}/2022/01/07.jsonl"
 *  ...
 *  "{prefix}/2023/02/24.jsonl"
 *  "{prefix}/2023/02/25.jsonl"
 *  "{prefix}/2023/02/26.jsonl"
 * ]
 * ```
 */
async function* gcsKeysGenerator(req: GetDataInput, prefix: string): AsyncGenerator<[Date, string], void, void> {
    const MAX_FILES_ALLOWED = 365 * 5 + 1 // (+1 for the leap year)
    let _counter = 0
    for (let y = req.start!.year; y <= (req.end.year ?? req.start!.year); y++) {
        for (let m = monthStartRange(y, req); m <= monthEndRange(y, req); m++) {
            for (let d = dayStartRange(y, m, req); d <= dayEndRange(y, m, req); d++) {
                _counter++
                if (_counter > MAX_FILES_ALLOWED) {
                    return
                }
                yield [
                    ymdToUTCDate({ year: y, month: m, day: d }),
                    `${prefix}/${y}/${withZero(m)}/${withZero(d)}.jsonl`
                ]
            }
        }
    }
}

/**
 * @param year 
 * @param month 
 * @returns The total number of days in a particular month
 */
const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
}

/**
 * @param forYear number in range [req.start.year, req.end.year]
 * @param req
 * @returns
 */
const monthEndRange = (forYear: number, req: GetDataInput) => {
    if (forYear === req.end.year) {
        return req.end.month
    }
    return 12
}
/**
 * @param forYear number in range [req.start.year, req.end.year]
 * @param req
 * @returns
 */
const monthStartRange = (forYear: number, req: GetDataInput) => {
    if (forYear === req.start?.year) {
        return req.start.month
    }
    return 1
}
/**
 * @param forMonth number in range [1, 12]
 * @param forYear number in range [req.start.year, req.end.year]
 * @param req 
 * @returns
 */
const dayEndRange = (forYear: number, forMonth: number, req: GetDataInput) => {
    if (forYear === req.end.year && forMonth === req.end.month) {
        return req.end.day
    }
    return getDaysInMonth(forYear, forMonth)
}

/**
 * @param forMonth number in range [1, 12]
 * @param forYear number in range [req.start.year, req.end.year]
 * @param req 
 * @returns
 */
const dayStartRange = (forYear: number, forMonth: number, req: GetDataInput) => {
    if (forYear === req.start?.year && forMonth === req.start.month) {
        return req.start.day
    }
    return 1
}

const arrayRange = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step + 1 },
        (value, index) => start + index * step)

//#endregion