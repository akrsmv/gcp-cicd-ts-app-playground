/**
 * For ease of test/mocking clients
 * wraped in getters/setters
 */

import { Bucket, Storage } from "@google-cloud/storage"
import { RedisClientType, createClient } from "redis"
import { logerror } from "./log"

let _memoryStoreClient: RedisClientType,
    _gcsStorage: Storage,
    _gcsBucket: Bucket,
    _redisConnectionErrorsCount = 0

/**
 * BEWARE this SYNC getter should always return non-undefined instance
 * if library was used according to @see initServiceClients docs
 **/
export const getMemoryStoreClient = () => {
    if (_memoryStoreClient) {
        // this is here to defend from client libs 
        // which do not properly call initServiceClients in their initialization
        initMemoryStoreClient()
    }
    return _memoryStoreClient
}
export const getGcsStorage = (): Storage => {
    if (!_gcsStorage) {
        _gcsStorage = process.env.GCT_ENV === "LOCAL" ? new Storage(
            {
                projectId: process.env.BUCKET_NAME,
                keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
            })
            : new Storage()
    }
    return _gcsStorage
}
export const getGcsBucket = (): Bucket => {
    if (!_gcsBucket) {
        _gcsBucket = getGcsStorage().bucket(String(process.env.BUCKET_NAME))
    }
    return _gcsBucket
}

export const initMemoryStoreClient = async () => {
    if (!_memoryStoreClient) {
        _memoryStoreClient = createClient({
            url: process.env.REDIS_CONNECTION_STRING ?? `redis://127.0.0.1:6379`,
            password: process.env.REDIS_PWD
        })
        _memoryStoreClient.on('error', async (err) => {
            if (_redisConnectionErrorsCount > 10) {
                logerror(` ${_redisConnectionErrorsCount} times unable to connect to ${process.env.REDIS_CONNECTION_STRING ?? `redis://127.0.0.1:6379`}...`, err)
                logerror('Exitting')
                process.exit(1)
            }
            _redisConnectionErrorsCount++
            logerror('Redis Client Error. Attempting reconnect: ' + _redisConnectionErrorsCount, err)
            await new Promise(resolve => setTimeout(resolve, 5000));
        })
        await _memoryStoreClient.connect()
    }
}