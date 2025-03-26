import { Router } from 'express';
import commentController from '../controllers/comment.controller';
import { wrapAsync } from '../core';
import { authMiddleware } from '../middlewares/authMiddleware';

const commentRouter = Router();

commentRouter.get(
    '/post/:id',
    wrapAsync(commentController.getCommentsByPostId)
);

commentRouter.post(
    '/:id/reply',
    authMiddleware,
    wrapAsync(commentController.replyComment)
);

commentRouter.post(
    '/:id/like',
    authMiddleware,
    wrapAsync(commentController.likeComment)
);

commentRouter.patch(
    '/:id',
    authMiddleware,
    wrapAsync(commentController.updateComment)
);

commentRouter.delete(
    '/:id',
    authMiddleware,
    wrapAsync(commentController.deleteComment)
);

export default commentRouter;
