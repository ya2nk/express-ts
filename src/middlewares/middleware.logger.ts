import { NextFunction, Request, Response } from "express";
import logger from "../utils/util.logger";

export class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = Error.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}

export const requestLogger = (
  request: Request,
  response: Response,
  next: NextFunction) => {

  console.log(`${request.method} url:: ${request.url}`);
  next()
}

export const errorLogger = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction) => {
  logger.error(`error ${error.message}`)
  next(error) // calling next middleware
}

export const errorResponder = (
  error: AppError,
  request: Request,
  response: Response,
  next: NextFunction) => {
  const status = error.statusCode || 400
  response.status(status).json({ message: error.message, error: true })
}

export const invalidPathHandler = (
  request: Request,
  response: Response,
  next: NextFunction) => {
  response.status(404)
  response.json({ message: "Not found", error: true })

}