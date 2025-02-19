import { Router } from 'express';
import notifyCationController from '../controllers/notification.controller';
import { wrapAsync } from '../core';
import { authMiddleware } from '../middlewares/authMiddleware';

const notificationRouter = Router();

notificationRouter.get(
    '/',
    authMiddleware,
    wrapAsync(notifyCationController.getByUserId)
);

export default notificationRouter;
