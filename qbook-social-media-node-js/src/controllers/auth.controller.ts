import { Request, Response } from 'express';
import { createResponse } from '../core';
import ApiError from '../core/ApiError';
import authService from '../services/auth.service';
import { decodeToken } from '../utils/jwt.utils';

export type RegisterBody = {
    email: string;
    username: string;
    password: string;
};

const AuthController = {
    async register(req: Request, res: Response) {
        const { username, email, password }: RegisterBody = req.body;

        const activeToken = await authService.register({
            username,
            email,
            password,
        });

        const response = createResponse({
            status: 200,
            message: 'Register successful',
            data: { activeToken },
        });

        res.status(response.status).json(response);
    },

    async activeAccount(req: Request, res: Response) {
        const { otp } = req.body;

        const { userId } = req;
        const { accessToken, refreshToken } = await authService.activeAccount(
            userId!,
            otp
        );

        const response = createResponse({
            status: 200,
            message: 'Active account successful',
            data: { accessToken, refreshToken },
        });

        res.status(response.status).json(response);
    },
    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const data = await authService.login(email, password);

        if (data.status === 'enable-2fa') {
            const response = createResponse({
                status: 203,
                message: 'Verify 2fa',
                data: {
                    twoFaToken: data.twoFaToken,
                },
            });

            res.status(response.status).json(response);
            return;
        }

        const { accessToken, refreshToken } = data;

        const response = createResponse({
            status: 200,
            message: 'Login successful',
            data: {
                accessToken,
                refreshToken,
            },
        });

        res.status(response.status).json(response);
    },

    async verify2Fa(req: Request, res: Response) {
        const { otp } = req.body;
        const { userId } = req;

        const { accessToken, refreshToken } = await authService.verify2Fa(
            userId!,
            otp
        );
        const response = createResponse({
            status: 200,
            message: 'Verify 2fa successful',
            data: { accessToken, refreshToken },
        });

        res.status(response.status).json(response);
    },

    async forgotPassword(req: Request, res: Response) {
        const { email } = req.body;
        const data = await authService.forgotPassword(email);
        const response = createResponse({
            status: 200,
            message: 'Forgot password successful',
            data,
        });
        res.status(response.status).json(response);
    },

    async resetPassword(req: Request, res: Response) {
        const { otp, password } = req.body;
        const { userId } = req;
        const data = await authService.resetPassword(userId!, otp, password);
        const response = createResponse({
            status: 200,
            message: 'Reset password successful',
            data,
        });
        res.status(response.status).json(response);
    },

    async refreshToken(req: Request, res: Response) {
        const { refreshToken } = req.body;

        const { accessToken } = await authService.refreshToken(refreshToken);
        const response = createResponse({
            status: 200,
            message: 'Refresh token successful',
            data: { accessToken },
        });
        res.status(response.status).json(response);
    },
    async verify(req: Request, res: Response) {
        const { userId } = req;
        if (!userId) {
            throw ApiError.unauthorized();
        }
        const response = createResponse({
            status: 200,
            message: 'Verify successful',
        });
        res.status(response.status).json(response);
    },

    async logout(req: Request, res: Response) {
        const accessToken = req.headers.authorization?.split(' ')[1];
        const { refreshToken } = req.body;
        const { userId } = decodeToken(accessToken!) as { userId: string };

        await authService.logout(userId, accessToken!, refreshToken);

        res.status(200).json({
            status: 200,
            message: 'Logout successful',
        });
    },

    async logoutAll(req: Request, res: Response) {
        const accessToken = req.headers.authorization?.split(' ')[1];
        const { userId } = decodeToken(accessToken!) as { userId: string };

        await authService.logoutAll(userId, accessToken!);

        res.status(200).json({
            status: 200,
            message: 'Logout all successful',
        });
    },
};

export default AuthController;
