import { Router } from 'express';
import userController from '../controllers/user.controller';
import { wrapAsync } from '../core';
import { authMiddleware } from '../middlewares/authMiddleware';

const userRouter = Router();

userRouter.get('/me', authMiddleware, wrapAsync(userController.getMe));
userRouter.get('/profile/:id', wrapAsync(userController.getProfile));
userRouter.get(
    '/suggest',
    authMiddleware,
    wrapAsync(userController.getSuggestions)
);
userRouter.get('/search', wrapAsync(userController.searchUser));
userRouter.patch(
    '/profile',
    authMiddleware,
    wrapAsync(userController.updateProfile)
);

export default userRouter;
