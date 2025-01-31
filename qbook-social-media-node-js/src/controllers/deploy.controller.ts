import { Request, Response } from 'express';
import deployService from '../services/deploy.service';
import { createResponse } from '../core';
import ApiError from '../core/ApiError';

const deployController = {
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
};

export default deployController;
