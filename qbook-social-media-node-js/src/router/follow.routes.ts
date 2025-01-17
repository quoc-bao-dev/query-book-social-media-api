import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { wrapAsync } from '../core';
import FollowController from '../controllers/follow.controller';

const followRouter = Router();

followRouter.get('/', authMiddleware, wrapAsync(FollowController.getFollowers));

followRouter.post('/:id', authMiddleware, wrapAsync(FollowController.follow));

followRouter.delete(
    '/:id',
    authMiddleware,
    wrapAsync(FollowController.unFollow)
);

export default followRouter;
