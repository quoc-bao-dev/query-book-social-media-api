import { NextFunction, Request, Response } from 'express';
import ApiError from '../core/ApiError';
import { verifyActiveAccountToken } from '../utils/authToken.utils';

const activeAccountMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { activeToken } = req.body;

    if (!activeToken) {
        throw ApiError.unauthorized('Active token is required');
    }

    const verifyToken = verifyActiveAccountToken(activeToken) as {
        userId: string;
    };

    if (!verifyToken) {
        throw ApiError.unauthorized('Invalid active token');
    }

    const { userId } = verifyToken;

    req.userId = userId;

    next();
};

export default activeAccountMiddleware;
