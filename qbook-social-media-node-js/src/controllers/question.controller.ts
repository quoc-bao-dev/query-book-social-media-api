import { Request, Response } from 'express';
import { createPaginationResponse, createResponse } from '../core';
import questionService from '../services/question.service';

const QuestionController = {
    create: async (req: Request, res: Response) => {
        const {
            topic,
            title,
            question,
            code: { fileType, code },
            image,
            hashtags,
        } = req.body;
        const userId = req.userId;

        const payload = {
            userId,
            title,
            topic,
            question,
            code: {
                fileType,
                code,
            },
            image,
            hashtags,
        };

        const data = await questionService.create(payload);

        const response = createResponse({
            status: 200,
            message: 'create question success!',
            data,
        });
        res.status(response.status).json(response);
    },

    getById: async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await questionService.getById(id);
        const response = createResponse({
            status: 200,
            message: 'get question by id successful!',
            data: result,
        });

        res.status(response.status).json(response);
    },

    getAll: async (req: Request, res: Response) => {
        const { s, limit, page } = req.query;
        const result = await questionService.getAll(
            Number(limit ?? 10),
            Number(page ?? 1),
            s
        );
        const response = createPaginationResponse({
            status: 200,
            message: 'get all question successful!',
            data: result.data,
            pagination: result.pagination,
        });

        res.status(response.status).json(response);
    },

    getByUserId: async (req: Request, res: Response) => {
        const userId = req.userId;

        const data = await questionService.getByUserId(userId!);

        const response = createResponse({
            status: 200,
            message: 'get question by user success!',
            data,
        });
        res.status(response.status).json(response);
    },
};

export default QuestionController;
