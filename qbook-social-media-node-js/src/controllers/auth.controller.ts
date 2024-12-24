import { Request, Response } from 'express';
import { createResponse } from '../core';
import authService from '../services/auth.service';

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
};

export default AuthController;
