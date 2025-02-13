import { Request, Response } from 'express';
import { createResponse } from '../core';
import topicService from '../services/topic.service';

const TopicController = {
    create: async (req: Request, res: Response) => {
        const { name, description } = req.body;
        const topic = await topicService.create({ name, description });

        const response = createResponse({
            message: 'create topic success!',
            status: 200,
            data: topic,
        });

        res.status(response.status).json(response);
    },

    getAll: async (req: Request, res: Response) => {
        const { limit, page } = req.query;

        const topics = await topicService.getAll({ limit, page });

        const response = createResponse({
            message: 'get all topic',
            status: 200,
            data: topics,
        });

        res.status(response.status).json(response);
    },
};

export default TopicController;
