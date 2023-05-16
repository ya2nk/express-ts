import express, { NextFunction } from 'express'

export const reqRaw = (req: express.Request, res: express.Response, next: NextFunction) => {
    let data = '';
    req.setEncoding('utf8')
    req.on('data', function (chunk) {
        data += chunk;
    });
    req.on('end', function () {
        req.bodyRaw = data;
        next();
    });
}