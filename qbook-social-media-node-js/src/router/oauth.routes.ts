import { Router } from 'express';
import oauthController from '../controllers/oauth.controller';
import { wrapAsync } from '../core';

const oauthRouter = Router();

oauthRouter.get('/google', wrapAsync(oauthController.callbackGoogle));

export default oauthRouter;
