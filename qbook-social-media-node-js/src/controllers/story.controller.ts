import { Request, Response } from 'express';
import { createResponse } from '../core';
import ApiError from '../core/ApiError';
import storyService from '../services/story.service';

const StoryController = {
    async getStories(req: Request, res: Response) {
        const userId = req.userId;

        const stories = await storyService.getStories(userId!);
        const response = createResponse({
            status: 200,
            message: 'Get stories successful',
            data: stories,
        });
        res.status(response.status).json(response);
    },
    async getStoryById(req: Request, res: Response) {
        const { id } = req.params;
        const userId = req.userId;
        const story = await storyService.getStoryById(id, userId);
        const response = createResponse({
            status: 200,
            message: 'Get story successful',
            data: story,
        });

        res.status(response.status).json(response);
    },

    async create(req: Request, res: Response) {
        const { content, media } = req.body;
        const userId = req.userId!;

        if (!content) {
            throw ApiError.badRequest('Content is required');
        }

        if (!media) {
            throw ApiError.badRequest('Media is required');
        }

        const story = await storyService.create({
            userId,
            content,
            media,
        });

        const response = createResponse({
            status: 200,
            message: 'Create story successful',
            data: story,
        });
        res.status(response.status).json(response);
    },
};

export default StoryController;
