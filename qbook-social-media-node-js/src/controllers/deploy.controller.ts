import { Request, Response } from 'express';
import { createResponse } from '../core';
import ApiError from '../core/ApiError';
import deployService from '../services/deploy.service';

const deployController = {
    getHostingByUserId: async (req: Request, res: Response) => {
        const userId = req.userId;
        const data = await deployService.getHostingByUserId(userId!);
        const response = createResponse({
            status: 200,
            message: data.data.message,
            data: data.data,
        });
        res.status(response.status).json(response);
    },
    upload: async (req: Request, res: Response) => {
        if (!req.file) {
            throw ApiError.badRequest('File is required');
        }

        const file = req.file;
        const userId = req.userId;
        const subDomain = req.body.subDomain;
        const data = await deployService.upload({
            file: file,
            subDomain,
            userId,
        });

        const response = createResponse({
            status: 200,
            message: 'Upload successful',
            data,
        });
        res.status(response.status).json(response);
    },

    createHosting: async (req: Request, res: Response) => {
        const subDomain = req.body?.subDomain;
        const userId = req?.userId;

        if (!userId) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }

        if (!subDomain) {
            res.status(400).json({ message: 'Subdomain is required' });
            return;
        }

        const data = await deployService.createHosting({
            subDomain,
            userId,
        });

        const payload = {
            userId: data.data.userId,
            subDomain: data.data.subdomain,
        };

        const response = createResponse({
            status: 200,
            message: data.message,
            data: payload,
        });
        res.status(response.status).json(response);
    },

    delete: async (req: Request, res: Response) => {
        const subDomain = req.params.subDomain;
        const userId = req?.userId;

        console.log(12121212);

        if (!subDomain) {
            res.status(400).json({ message: 'Subdomain is required' });
            return;
        }

        const data = await deployService.delete({ subDomain, userId });
        const response = createResponse({
            status: 200,
            message: data.message,
        });
        res.status(response.status).json(response);
    },
};

export default deployController;
