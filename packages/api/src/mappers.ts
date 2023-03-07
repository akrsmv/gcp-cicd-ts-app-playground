import { GetDataRequest } from "@gctapp/core";
import { GctDataKind } from "@gctapp/core/src/interfaces-private";

/**
 * Constructs a GetTSDataRequest from a given object
 */
export const tsDataRange = (req: any): GetDataRequest => ({
    daysBack: req.query?.d,
    monthsBack: req.query?.m,
    yearsBack: req.query?.y,
    limit: req.query?.l,
    range: req.query?.r,
    day: req.params?.day,
    month: req.params?.day,
    year: req.params?.day,
})

/**
 * Constructs GctDataKind from a given object
 * 
 * @param {Request} req 
 * @returns GctDataKind object
 */
export const tsDataKind = (req: any): GctDataKind => ({
    indexName: req.params?.dataKind,
    unit: req.params?.dataUnit
})