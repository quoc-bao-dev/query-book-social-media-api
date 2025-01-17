import { Request, Response } from 'express';
import followService from '../services/follow.service';
import { createResponse } from '../core';

const FollowController = {
    async getFollowers(req: Request, res: Response) {
        const userId = req.userId!;
        const followers = await followService.getFollowers(userId);
        const response = createResponse({
            status: 200,
            message: 'Get followers successful',
            data: followers,
        });
        res.status(response.status).json(response);
    },
    async follow(req: Request, res: Response) {
        const userId = req.userId!;
        const { id } = req.params;

        const follow = await followService.follow(userId, id);

        const response = createResponse({
            status: 200,
            message: 'Follow this user successful!',
        });

        res.status(response.status).json(response);
    },

    async unFollow(req: Request, res: Response) {
        const userId = req.userId!;
        const { id } = req.params;

        const follow = await followService.unFollow(userId, id);

        const response = createResponse({
            status: 200,
            message: 'Unfollow this user successful!',
        });

        res.status(response.status).json(response);
    },
};

export default FollowController;
