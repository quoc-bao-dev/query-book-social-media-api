import { Router } from 'express';
import FriendController from '../controllers/friend.controller';
import { wrapAsync } from '../core';
import { authMiddleware } from '../middlewares/authMiddleware';

const friendRouter = Router();

friendRouter.get(
    '/',
    authMiddleware,
    wrapAsync(FriendController.getListFriend)
);

friendRouter.get(
    '/requests',
    authMiddleware,
    wrapAsync(FriendController.getRequests)
);
friendRouter.get(
    '/send-requests',
    authMiddleware,
    wrapAsync(FriendController.getSendRequest)
);

friendRouter.post(
    '/send-request',
    authMiddleware,
    wrapAsync(FriendController.sendRequest)
);

friendRouter.post(
    '/accept-request',
    authMiddleware,
    wrapAsync(FriendController.acceptRequest)
);

friendRouter.post(
    '/reject-request',
    authMiddleware,
    wrapAsync(FriendController.rejectRequest)
);

friendRouter.delete(
    '/remove/:id',
    authMiddleware,
    wrapAsync(FriendController.removeFriend)
);

friendRouter.delete(
    '/cancel-request/:id',
    authMiddleware,
    wrapAsync(FriendController.cancelRequest)
);

export default friendRouter;
