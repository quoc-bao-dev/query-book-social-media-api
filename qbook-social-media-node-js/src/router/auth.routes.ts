import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { wrapAsync } from '../core';
import activeAccountMiddleware from '../middlewares/activeAccount.middleware';
import verifyTwoFaMiddleware from '../middlewares/verifyTwoFa.middleware';

const authRouter = Router();

authRouter.post('/register', wrapAsync(AuthController.register));
authRouter.post(
    '/register/verify-otp',
    activeAccountMiddleware,
    wrapAsync(AuthController.activeAccount)
);

authRouter.post('/login', wrapAsync(AuthController.login));
authRouter.post(
    '/login/verify-2fa',
    verifyTwoFaMiddleware,
    wrapAsync(AuthController.verify2Fa)
);

export default authRouter;
