/**
 * A centralized placeholder for error messages
 */
export enum GctErrorMessage {
    GCTE400 = "Year must be of range [1950,<Current year>]",
    GCTE401 = "Invalid month of year",
    GCTE402 = "invalid date of month",
    GCTE403 = "invalid endDate",

    GCTE500 = "Invalid data query",
    GCTE501 = "Invalid index info",
    GCTE502 = "Server Error. Please contact the administrators",

    GCTE900 = "Error generating sample data",
}

export class GctError<ERR_CODE = keyof GctErrorMessage> extends Error {
    public code: ERR_CODE;
    constructor(code_key: ERR_CODE,  message: GctErrorMessage, callerMessage?: string) {
        super((callerMessage ? `[${callerMessage}]:`: '') + message)
        this.code = code_key
    }
}