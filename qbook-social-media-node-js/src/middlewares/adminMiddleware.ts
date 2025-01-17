import { NextFunction, Request, Response } from 'express';
import ApiError from '../core/ApiError';
import { AdminRoleType } from '../models/types/type';
import { verifyAdminAccessToken } from '../utils/authToken.utils';

export const adminMiddleware =
    (roles: AdminRoleType[]) =>
    (req: Request, res: Response, next: NextFunction) => {
        const accessToken = req.headers.authorization?.split(' ')[1];
        if (!accessToken) {
            next(ApiError.unauthorized());
            return;
        }

        try {
            const tokenPayload = verifyAdminAccessToken(accessToken) as {
                adminId: string;
                role: AdminRoleType;
            };

            const isAdmin = roles.includes(tokenPayload.role);
            if (!isAdmin) {
                next(ApiError.unauthorized('Unauthorized'));
                return;
            }

            req.userId = tokenPayload.adminId;
            next();
        } catch (error) {
            next(error);
        }
    };
