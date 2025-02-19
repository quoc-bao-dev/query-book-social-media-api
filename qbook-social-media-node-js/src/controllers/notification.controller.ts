import { Request, Response } from 'express';
import notificationService from '../services/notification.service';
import { createResponse } from '../core';

const notifyCationController = {
    getByUserId: async (req: Request, res: Response) => {
        const userId = req.userId;

        const result = await notificationService.getByUserId(userId!);

        const response = createResponse({
            status: 200,
            message: 'get notification successful',
            data: result,
        });

        res.status(response.status).json(response);
    },
};

export default notifyCationController;
