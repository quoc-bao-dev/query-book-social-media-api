import { Response } from 'express';
import config from '../config/config';

export const setCookie = (res: Response) => ({
    accessToken(accessToken: string) {
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            domain: config.DOMAIN,
            path: '/',
            maxAge: 3600 * 1000,
            sameSite: 'none',
        });
    },
    refreshToken(refreshToken: string) {
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            domain: config.DOMAIN,
            path: '/',
            maxAge: 3600 * 1000 * 24 * 30,
            sameSite: 'none',
        });
    },
});
