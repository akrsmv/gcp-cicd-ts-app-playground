import { GctError, GctErrorMessage } from "./errors";
import { ValidateDateInput, YearMonthDay } from "./interfaces-private";

export const datePattern = new RegExp("(?<year>[\\d]{4})[/,-]?(?<month>[\\d]{1,2})?[/,-]?(?<day>[\\d]{1,2})")
/**
 * @param year 
 * @param month 
 * @returns The total number of days in a particular month
 */
export const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
}

/**
 * Ensures leading zeros in numbers
 * @param n 
 * @returns 
 */
export const withZero = (n: number) => String(n).padStart(2, '0')

/**
 * 3 values taken from a given date
 * @param dateObj 
 * @returns {year, month, day}
 */
export const dateToYmd = (dateObj: Date | number) => {
    const [y, m, d] = (typeof dateObj === "number"? new Date(dateObj) : dateObj).toISOString().slice(0,10).split("-")
    return { year: Number(y), month: Number(m), day: Number(d) }
}

export const ymdToUTCDate = (input: YearMonthDay) => {
    const { year, month, day } = input
    return new Date(`${year}-${withZero(month)}-${withZero(day)}T00:00:00.000Z`)
}

export const strToYmd = (ymdStr:string, setDefaultStartDate: boolean = false, callerStr?: string) => {
    const matched = datePattern.exec(ymdStr)?.groups
    if (matched) { 
        // BEWARE: match may be only partial
        // If so setDefaultStartDate's value will say if error is thrown or date is returned
        return validateInputDate({
            year: matched.year,
            month: matched.month,
            day: matched.day,
            callerStr,
            setDefaultStartDate
        })
    } else if (setDefaultStartDate) {
        // if input was not matched at all(undefined)
        // but still a default date is requested:
        return dateToYmd(new Date())
    }
    throw new GctError("GCTE900", GctErrorMessage.GCTE900)
}

/**
 * Ensures valid dates
 * @param req 
 * @param callerStr 
 * @returns instance of YearMonthDay
 */
export const validateInputDate = (req: ValidateDateInput): YearMonthDay => {
    const current = dateToYmd(new Date())

    let year = Number(req.year)
    let month = Number(req.month)
    let day = Number(req.day)

    if (req.setDefaultStartDate && !year && !month && !day) {
        year = current.year
        month = current.month
        day = current.day
    }
    if (req.setDefaultStartDate && year && !month) {
        month = 1
    }
    if (req.setDefaultStartDate && year && !day) {
        day = 1
    }

    if (!year || Number.isNaN(year) || !(year >= 1950 && year <= new Date().getFullYear())) {
        throw new GctError("GCTE400", GctErrorMessage.GCTE400, req.callerStr)
    }
    if (!month || Number.isNaN(month) || !(month >= 1 && month <= 12)) {
        throw new GctError("GCTE401", GctErrorMessage.GCTE401, req.callerStr)
    }
    if (!day || Number.isNaN(day) || !(day >= 1 && day <= getDaysInMonth(year, month))) {
        throw new GctError("GCTE402", GctErrorMessage.GCTE402, req.callerStr)
    }

    return { year, month, day }
}
