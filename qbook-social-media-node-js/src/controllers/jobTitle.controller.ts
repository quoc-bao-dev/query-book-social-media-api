import { Request, Response } from 'express';
import jobTitleService from '../services/jobTitle.service';
import { createResponse } from '../core';
const jobTitleController = {
    async create(req: Request, res: Response) {
        const { title, description } = req.body;

        const jobTitle = await jobTitleService.create({
            title,
            description,
        });

        const response = createResponse({
            status: 200,
            message: 'Create job title successful',
            data: jobTitle,
        });

        res.status(response.status).json(response);
    },

    async getJobTitles(req: Request, res: Response) {
        const jobTitles = await jobTitleService.getJobTitles();

        const response = createResponse({
            status: 200,
            message: 'Get job titles successful',
            data: jobTitles,
        });
        res.status(response.status).json(response);
    },
};

export default jobTitleController;
