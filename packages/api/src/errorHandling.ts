import { GctError } from "@gctapp/core"
import { NextFunction, Request, Response } from 'express';

export const handleGctErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err)
    }
    if (err instanceof GctError) {
        res.status(400) //  further set 4xx statuses depending on gctapp error code
    } else {
        res.status(500)
    }
    res.send(process.env.NODE_ENV !== 'production'
        ? JSON.stringify(
            {
                error: err.message,
                stack: err.stack?.split('\n')
            }, null, 4)
        : '')
}