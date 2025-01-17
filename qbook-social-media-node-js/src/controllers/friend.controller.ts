import { Request, Response } from 'express';
import { createResponse } from '../core';
import friendService from '../services/friend.service';

const FriendController = {
    getListFriend: async (req: Request, res: Response) => {
        const userId = req.userId!;
        const friends = await friendService.getFriends(userId);
        const response = createResponse({
            status: 200,
            message: 'Get list friend successful',
            data: friends,
        });
        res.status(response.status).json(response);
    },

    getRequests: async (req: Request, res: Response) => {
        const userId = req.userId!;
        const requests = await friendService.getPendingRequests(userId);
        const response = createResponse({
            status: 200,
            message: 'Get requests successful',
            data: requests,
        });
        res.status(response.status).json(response);
    },
    sendRequest: async (req: Request, res: Response) => {
        const userId = req.userId!;
        const { targetId } = req.body;
        const request = await friendService.sendRequest(userId, targetId);

        const response = createResponse({
            status: 200,
            message: 'Send request successful',
            data: request,
        });
        res.status(response.status).json(response);
    },

    acceptRequest: async (req: Request, res: Response) => {
        const userId = req.userId!;
        const { senderId } = req.body;
        const request = await friendService.acceptRequest(userId, senderId);

        const response = createResponse({
            status: 200,
            message: 'Accept request successful',
            data: request,
        });
        res.status(response.status).json(response);
    },

    rejectRequest: async (req: Request, res: Response) => {
        const userId = req.userId!;
        const { senderId } = req.body;
        const request = await friendService.rejectRequest(userId, senderId);

        const response = createResponse({
            status: 200,
            message: 'Reject request successful',
            data: request,
        });
        res.status(response.status).json(response);
    },

    removeFriend: async (req: Request, res: Response) => {
        const userId = req.userId!;
        const { id: friendId } = req.params;
        const request = await friendService.removeFriend(userId, friendId);

        const response = createResponse({
            status: 200,
            message: 'Remove friend successful',
            data: request,
        });
        res.status(response.status).json(response);
    },
};

export default FriendController;
