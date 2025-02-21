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
        const { questionId, content, code } = req.body;
        const userId = req.userId;

        const payload = {
            userId,
            questionId,
            content,
            code,
        };

        console.log(payload);

        const answer = await answerService.create(payload);

        const response = createResponse({
            status: 200,
            message: 'create answer successful!',
            data: answer,
        });

        res.status(response.status).json(response);
    },
};

export default answerController;
