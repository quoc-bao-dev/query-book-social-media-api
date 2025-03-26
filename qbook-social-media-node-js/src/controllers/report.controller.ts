import { Request, Response } from 'express';
import reportService from '../services/report.service';
import { createResponse } from '../core';

const reportController = {
    async getPostReports(req: Request, res: Response) {
        const reports = await reportService.getPostReports();

        const response = createResponse({
            status: 200,
            message: 'get post reports successful!',
            data: reports,
        });

        res.status(response.status).json(response);
    },

    async getAccountReports(req: Request, res: Response) {
        const reports = await reportService.getAccountReports();

        const response = createResponse({
            status: 200,
            message: 'get account reports successful!',
            data: reports,
        });

        res.status(response.status).json(response);
    },

    async getQuestionReports(req: Request, res: Response) {
        const reports = await reportService.getQuestionReports();

        const response = createResponse({
            status: 200,
            message: 'get question reports successful!',
            data: reports,
        });

        res.status(response.status).json(response);
    },

    async reportPost(req: Request, res: Response) {
        const { postId } = req.params;
        const { reason, content } = req.body;
        const userId = req.userId;

        const report = await reportService.cretePostReport({
            postId,
            reason,
            content,
            userReport: userId!,
        });

        const response = createResponse({
            status: 200,
            message: 'report post successful!',
            data: report,
        });

        res.status(response.status).json(response);
    },

    async reportAccount(req: Request, res: Response) {
        const { accountId } = req.params;
        const { reason, content } = req.body;
        const userId = req.userId;

        const report = await reportService.createAccountReport({
            accountId,
            reason,
            content,
            userReport: userId!,
        });

        const response = createResponse({
            status: 200,
            message: 'report account successful!',
            data: report,
        });

        res.status(response.status).json(response);
    },

    async reportQuestion(req: Request, res: Response) {
        const { questionId } = req.params;
        const { reason, content } = req.body;
        const userId = req.userId;

        const report = await reportService.createQuestionReport({
            questionId,
            reason,
            content,
            userReport: userId!,
        });

        const response = createResponse({
            status: 200,
            message: 'report question successful!',
            data: report,
        });

        res.status(response.status).json(response);
    },
};

export default reportController;
