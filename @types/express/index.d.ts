declare namespace Express {
    interface Request {
        user?: object,
        bodyRaw?: any
    }
}