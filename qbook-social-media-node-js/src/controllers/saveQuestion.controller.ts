import { Request, Response } from 'express';
import { createResponse } from '../core';
import saveQuestionService from '../services/saveQuestion.service';

const SaveQuestionController = {
    getByUserId: async (req: Request, res: Response) => {
        const userId = req.userId;
        const questions = await saveQuestionService.getByUserId(userId!);
        const response = createResponse({
            status: 200,
            message: 'get save question successful!',
            data: questions,
        });

        res.status(response.status).json(response);
    },

    create: async (req: Request, res: Response) => {
        const userId = req.userId;
        const { questionId } = req.body;

        const payload = {
            userId,
            questionId,
        };

        const question = await saveQuestionService.create(payload);
        const response = createResponse({
            status: 200,
            message: 'save question successful!',
            data: question,
        });

        res.status(response.status).json(response);
    },
};

export default SaveQuestionController;
