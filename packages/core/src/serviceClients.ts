/**
 * For ease of test/mocking clients
 * wraped in getters/setters
 */

import { Bucket, Storage } from "@google-cloud/storage"
import { RedisClientType, createClient } from "redis"
import { logerror, logwarn } from "./log"

let _memoryStoreClient: RedisClientType,
    _gcsStorage: Storage,
    _gcsBucket: Bucket

export const getMemoryStoreClient = () => {
    if (_memoryStoreClient) {
        // BEWARE (since we want to keep this getter SYNC)
        // _memoryStoreClient should not be undefined at this point
        // this is here only to defend from client libs 
        // which do not properly call initServiceClients in their initialization
        initMemoryStoreClient()
    }
    return _memoryStoreClient
}
export const getGcsStorage = (): Storage => {
    if (!_gcsStorage) {
        _gcsStorage = process.env.ENV === "LOCALDEV" ? new Storage(
            {
                projectId: 'toki-take-home-2023',
                keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
            })
            // if not localdev, Creates a client using Application Default Credentials
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
        _memoryStoreClient = createClient({ url: process.env.REDIS_CONNECTION_STRING ?? `redis://127.0.0.1:6379` })
        _memoryStoreClient.on('error', async (err) => {
            logerror('Redis Client Error. Attempting reconnect...', err)
        })
        await _memoryStoreClient.connect()
    }
}