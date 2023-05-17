import express, { NextFunction } from 'express'
import qs from 'qs'

export const reqRaw = (req: express.Request, res: express.Response, next: NextFunction) => {

    if (req.headers['content-type'] === 'application/json') {
        req.body = JSON.parse(req.body);
    }

    if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        req.body = qs.parse(req.body);
    }
    next();
}