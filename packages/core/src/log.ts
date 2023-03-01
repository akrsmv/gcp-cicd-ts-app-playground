const logLevels = ["debug", "info", "warn", "error"]
const allowedLogLevels = () => logLevels.slice(logLevels.indexOf(process.env.LOGLEVEL || "warn"))

function withLevel(this: string, logFn: Function, ...data: any) {
    if (allowedLogLevels().includes(String(this))) {
        logFn.call(null, ...data)
    }
}

export const loginfo = withLevel.bind("info", console.info)
export const logdebug = withLevel.bind("debug", console.log)
export const logwarn = withLevel.bind("warn", console.warn)
export const logerror = withLevel.bind("error", console.error)
