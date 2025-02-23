import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { wrapAsync } from '../core';
import {
    activeAccountMiddleware,
    authMiddleware,
    resetPasswordMiddleware,
    verifyTwoFaMiddleware,
} from '../middlewares/authMiddleware';
import systemLogMiddleware from '../middlewares/systemLogMiddleware';

const authRouter = Router();
authRouter.post('/register', wrapAsync(AuthController.register));

authRouter.post(
    '/register/verify-otp',
    activeAccountMiddleware,
    wrapAsync(AuthController.activeAccount)
);
authRouter.post(
    '/login',
    systemLogMiddleware('user'),
    wrapAsync(AuthController.login)
);

authRouter.post(
    '/login/verify-2fa',
    verifyTwoFaMiddleware,
    wrapAsync(AuthController.verify2Fa)
);

authRouter.post('/gen-active-token', wrapAsync(AuthController.genActiveToken));

authRouter.post('/refresh-token', wrapAsync(AuthController.refreshToken));

authRouter.post('/verify', authMiddleware, wrapAsync(AuthController.verify));

authRouter.post('/forgot-password', wrapAsync(AuthController.forgotPassword));

authRouter.post(
    '/reset-password',
    resetPasswordMiddleware,
    wrapAsync(AuthController.resetPassword)
);

authRouter.post('/logout', wrapAsync(AuthController.logout));

authRouter.post('/logout-all', wrapAsync(AuthController.logoutAll));

export default authRouter;
