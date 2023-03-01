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
/** For future use
 */
export interface PriceData {
    timestamp: number
    price: number
    currency: string
}
/** For future use
 */
export interface UsageData {
    timestamp: number
    kwh: number
}

export interface ValidateDateInput extends GetDataRequest {
    callerStr?: string
    setDefaultStartDate: boolean
}