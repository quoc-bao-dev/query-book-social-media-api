import { Request, Response } from 'express';
import { createResponse } from '../core';
import { WorkExperienceBody } from '../models/types/workExperience.type';
import workExperienceService from '../services/workExperience.service';

const workExperienceController = {
    create: async (req: Request, res: Response) => {
        const {
            company,
            content,
            description,
            jobTitleId,
            startDate,
            endDate,
        }: WorkExperienceBody = req.body;

        const userId = req.userId!;

        const workExperience = await workExperienceService.create({
            company,
            content,
            description,
            jobTitleId,
            startDate,
            endDate,
            userId,
        });

        const response = createResponse({
            status: 200,
            message: 'Create work experience successful',
            data: workExperience,
        });
        res.status(response.status).json(response);
    },
    update: async (req: Request, res: Response) => {
        const { id } = req.params;
        const {
            company,
            content,
            description,
            jobTitleId,
            startDate,
            endDate,
        }: WorkExperienceBody = req.body;

        const userId = req.userId!;

        const workExperience = await workExperienceService.updateWorkExperience(
            id,
            userId,
            {
                company,
                content,
                description,
                jobTitleId,
                startDate,
                endDate,
            }
        );

        const response = createResponse({
            status: 200,
            message: 'Update work experience successful',
            data: workExperience,
        });
        res.status(response.status).json(response);
    },
    delete: async (req: Request, res: Response) => {
        const { id } = req.params;
        const userId = req.userId!;

        const workExperience = await workExperienceService.deleteWorkExperience(
            id,
            userId
        );

        const response = createResponse({
            status: 200,
            message: 'Delete work experience successful',
            data: workExperience,
        });
        res.status(response.status).json(response);
    },
    get: async (req: Request, res: Response) => {
        const { id } = req.params;
        const workExperience =
            await workExperienceService.getWorkExperienceById(id);
        const response = createResponse({
            status: 200,
            message: 'Get work experience successful',
            data: workExperience,
        });
        res.status(response.status).json(response);
    },
    getByUserId: async (req: Request, res: Response) => {
        const { userId } = req.params;

        console.log(userId);

        const workExperiences = await workExperienceService.getWorkExperiences(
            userId
        );
        const response = createResponse({
            status: 200,
            message: 'Get work experiences successful',
            data: workExperiences,
        });
        res.status(response.status).json(response);
    },
    getAll: async (req: Request, res: Response) => {
        const userId = req.userId!;
        const workExperiences = await workExperienceService.getWorkExperiences(
            userId
        );
        const response = createResponse({
            status: 200,
            message: 'Get all work experiences successful',
            data: workExperiences,
        });
        res.status(response.status).json(response);
    },
};

export default workExperienceController;
