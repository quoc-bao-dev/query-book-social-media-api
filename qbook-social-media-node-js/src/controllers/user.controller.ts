import { Request, Response } from 'express';
import { createResponse } from '../core';
import {
    UpdateUserBody,
    UpdateUserServiceInput,
} from '../models/types/user.type';
import userService from '../services/user.service';

const UserController = {
    async getMe(req: Request, res: Response) {
        const userId = req.userId!;
        const user = await userService.getMe(userId);
        const response = createResponse({
            status: 200,
            message: 'Get me successful',
            data: user,
        });
        res.status(response.status).json(response);
    },
    async getProfile(req: Request, res: Response) {
        const { id } = req.params;

        const user = await userService.getUserById(id);
        const response = createResponse({
            status: 200,
            message: 'Get profile successful',
            data: user,
        });
        res.status(response.status).json(response);
    },

    async searchUser(req: Request, res: Response) {
        const { q } = req.query as { q: string };
        const userId = req.userId!;
        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;

        const users = await userService.searchUser({
            query: q,
            userId,
            page,
            limit,
        });
        const response = createResponse({
            status: 200,
            message: 'Search successful',
            data: users,
        });
        res.status(response.status).json(response);
    },

    async updateProfile(req: Request, res: Response) {
        const userId = req.userId!;

        const payload: UpdateUserBody = req.body;

        const updatePayload: UpdateUserServiceInput = {
            ...payload,
        };

        const user = await userService.updateUser(userId, updatePayload);
        const response = createResponse({
            status: 200,
            message: 'Update profile successful',
            data: user,
        });
        res.status(response.status).json(response);
    },
};

export default UserController;
