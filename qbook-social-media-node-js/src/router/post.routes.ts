import { Router } from 'express';
import PostController from '../controllers/post.controller';
import { wrapAsync } from '../core';
import {
    authMiddleware,
    userIdMiddleware,
} from '../middlewares/authMiddleware';

const postRouter = Router();

postRouter.get('/', userIdMiddleware, wrapAsync(PostController.getPosts));
postRouter.get('/user/:userId', wrapAsync(PostController.getPostByUserId));
postRouter.get('/:id', wrapAsync(PostController.getPostById));
postRouter.post('/', authMiddleware, wrapAsync(PostController.create));
postRouter.patch('/:id', authMiddleware, wrapAsync(PostController.updatePost));
postRouter.delete('/:id', authMiddleware, wrapAsync(PostController.deletePost));

postRouter.post(
    '/:id/like',
    authMiddleware,
    wrapAsync(PostController.likePost)
);

postRouter.post(
    '/:id/comment',
    authMiddleware,
    wrapAsync(PostController.commentPost)
);

export default postRouter;
