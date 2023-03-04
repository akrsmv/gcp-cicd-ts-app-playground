// Interfaces that are not exported in this package index

import { GetDataRequest } from "./interfaces-public"

/**
 * Validated and transformed GetDataRequest
 */
export interface GetDataInput {
    start?: YearMonthDay,
    end: YearMonthDay
}

export interface YearMonthDay {
    year: number
    month: number
    day: number
}

export interface ValidateDateInput extends GetDataRequest {
    callerStr?: string
    setDefaultStartDate: boolean
}

export interface GctDataKind {
    indexName: string,
    unit: string
}

export type GctData<Data, Name extends keyof Data> = { [key in Name]: GctDataKind }