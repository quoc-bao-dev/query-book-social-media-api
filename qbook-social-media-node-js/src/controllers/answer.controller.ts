import { Request, Response } from 'express';
import { createResponse } from '../core';
import answerService from '../services/answer.service';

const answerController = {
    getByQuestionId: async (req: Request, res: Response) => {
        const { questionId } = req.params;
        const answers = await answerService.getByQuestionId(questionId);

        const response = createResponse({
            status: 200,
            message: 'get answer by question id successful!',
            data: answers,
        });

        res.status(response.status).json(response);
    },

    create: async (req: Request, res: Response) => {
        const { questionId, content, code, images } = req.body;
        const userId = req.userId;

        const payload = {
            userId,
            questionId,
            content,
            code,
            images,
        };

        const answer = await answerService.create(payload);

        const response = createResponse({
            status: 200,
            message: 'create answer successful!',
            data: answer,
        });

        res.status(response.status).json(response);
    },

    vote: async (req: Request, res: Response) => {
        const { answerId } = req.params;
        const { vote } = req.body;
        const userId = req.userId!;

        const answer = await answerService.vote(answerId, userId, vote);

        const response = createResponse({
            status: 200,
            message: 'vote answer successful!',
            data: answer,
        });

        res.status(response.status).json(response);
    },

    async update(req: Request, res: Response) {
        const userId = req.userId;
        const { answerId } = req.params;
        const { content, code } = req.body;
        const payload = {
            content,
            code,
        };

        const answer = await answerService.update(answerId, payload, userId!);

        const response = createResponse({
            status: 200,
            message: 'update answer success!',
            data: answer,
        });

        res.status(response.status).json(response);
    },

    async delete(req: Request, res: Response) {
        const userId = req.userId;
        const { answerId } = req.params;

        const answer = await answerService.delete(answerId, userId!);

        const response = createResponse({
            status: 200,
            message: 'delete answer successful!',
            data: answer,
        });

        res.status(response.status).json(response);
    },
};

export default answerController;
