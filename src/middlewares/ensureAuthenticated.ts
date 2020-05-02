import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import TokenPayloadInterface from '../interfaces/TokenPayloadInterface';

import Config from '../configs';
import AppError from '../errors/AppError';

const authConfig = new Config().environment;

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError(401, 'JWT Token is Missing.');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt);

        const { sub } = decoded as TokenPayloadInterface;

        request.user = {
            id: sub,
        };

        next();
    } catch (err) {
        throw new AppError(401, 'Invalid JWT Token.');
    }
}
