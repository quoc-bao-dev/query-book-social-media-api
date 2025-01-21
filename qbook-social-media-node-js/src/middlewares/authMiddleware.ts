import { NextFunction, Request, Response } from 'express';
import ApiError from '../core/ApiError';
import { tokenRedis } from '../libs/redis/token.redis';
import {
    verifyAccessToken,
    verifyActiveAccountToken,
    verifyTowFAToken,
} from '../utils/authToken.utils';
import { decodeToken } from '../utils/jwt.utils';

// verify access token
export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const cookieAccessToken = req.cookies;
    const accessToken =
        cookieAccessToken?.accessToken ??
        req.headers.authorization?.split(' ')[1];

    if (!accessToken) {
        next(ApiError.unauthorized());
        return;
    }

    try {
        const verifyToken = verifyAccessToken(accessToken) as {
            userId: string;
        };
        if (!verifyToken) {
            next(ApiError.unauthorized());
            return;
        }
        const isTokenInBlacklist = await tokenRedis.checkAccessTokenInBlacklist(
            verifyToken.userId,
            accessToken
        );
        if (isTokenInBlacklist) {
            next(
                ApiError.unauthorized(
                    'Access token is invalid, token is blacklisted'
                )
            );
        }
        req.userId = verifyToken.userId;
        next();
    } catch (error) {
        next(error);
    }
};

// verify 2fa login token
export const verifyTwoFaMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { twoFaToken } = req.body;
    if (!twoFaToken) {
        throw ApiError.unauthorized('2fa token is required');
    }
    try {
        const verifyToken = verifyTowFAToken(twoFaToken) as {
            userId: string;
        };

        if (!verifyToken) {
            throw ApiError.unauthorized('Invalid 2fa token');
        }
        req.userId = verifyToken.userId;
        next();
    } catch (error) {
        next(error);
    }
};

//verify active account token
export const activeAccountMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { activeToken } = req.body;

    if (!activeToken) {
        throw ApiError.unauthorized('Active token is required');
    }

    try {
        const verifyToken = verifyActiveAccountToken(activeToken) as {
            userId: string;
        };

        if (!verifyToken) {
            throw ApiError.unauthorized('Invalid active token');
        }

        const { userId } = verifyToken;

        req.userId = userId;

        next();
    } catch (error) {
        next(error);
    }
};

// verify reset password token
export const resetPasswordMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { resetPassToken } = req.body;

    if (!resetPassToken) {
        throw ApiError.unauthorized('Reset password token is required');
    }

    try {
        const verifyToken = verifyActiveAccountToken(resetPassToken) as {
            userId: string;
        };

        if (!verifyToken) {
            throw ApiError.unauthorized('Invalid reset password token');
        }

        const { userId } = verifyToken;

        req.userId = userId;

        next();
    } catch (error) {
        next(error);
    }
};

// get user id
export const userIdMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const accessToken = req.headers.authorization?.split(' ')[1];

    if (!accessToken) {
        next();
        return;
    }

    try {
        const tokenPayload = decodeToken(accessToken) as {
            userId: string;
        };
        req.userId = tokenPayload.userId;
        next();
    } catch (error) {
        next();
    }
};
