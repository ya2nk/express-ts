import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import config from "../config/config";
import logger from "../utils/util.logger";
import { User } from "../models/user.model";

export const tokenVerify = (
	request: Request,
	response: Response,
	next: NextFunction) => {
	const authHeader = request.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if (token == null) {
		return response.status(401).json({ 'message': 'invalid token', 'error': true })
	}

	jwt.verify(token, config.JWT_SECRET, (err: any, payload: any) => {
		logger.error(err)

		if (err) return response.status(403).json({ 'message': 'token expired', 'error': true })
		request.user = User.findOne({ where: { id: payload.id } })
		next()
	})
}
