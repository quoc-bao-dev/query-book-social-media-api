import { NextFunction, Request, Response } from 'express';
import ApiError from '../core/ApiError';
import { verifyTowFAToken } from '../utils/authToken.utils';

const verifyTwoFaMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { twoFaToken } = req.body;

    if (!twoFaToken) {
        throw ApiError.unauthorized('2fa token is required');
    }

    const verifyToken = verifyTowFAToken(twoFaToken) as {
        userId: string;
    };

    if (!verifyToken) {
        throw ApiError.unauthorized('Invalid 2fa token');
    }

    req.userId = verifyToken.userId;

    next();
};

export default verifyTwoFaMiddleware;
