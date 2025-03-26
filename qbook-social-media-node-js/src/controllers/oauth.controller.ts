import { Request, Response } from 'express';
import config from '../config/config';
import oauthService from '../services/oauth.service';

const oauthController = {
    callbackGoogle: async (req: Request, res: Response) => {
        const code = req.query.code as string;

        const data = await oauthService.googleLogin(code);

        res.redirect(
            `${config.CLIENT_URL}/login-verify?accessToken=${
                data.accessToken
            }&refreshToken=${data.refreshToken}${
                data.isNew ? '&isNew=true' : ''
            }`
        );
    },
};

export default oauthController;
