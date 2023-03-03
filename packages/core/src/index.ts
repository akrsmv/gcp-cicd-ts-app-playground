import { initMemoryStoreClient } from './serviceClients'

export * from './log'
export * from './dataStore'
export * from './errors'
export * from './interfaces-public'
export { generateSampleFiles, removeSampleFiles } from './_devtools'

/**
* Readiness of the library. 
* Dependant libs should ensure they call on this being resolved before continue their initialization
* @returns 
*/
export const initServiceClients = new Promise<void>(async (resolve, reject) => {
    // Any other async clients used - initialize them here
    try {
        await initMemoryStoreClient()
    } catch (err) {
        reject(err)
    }
    resolve()
})