import { Router } from 'express';
import reportController from '../controllers/report.controller';
import { wrapAsync } from '../core';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminMiddleware } from '../middlewares/adminMiddleware';

const reportRouter = Router();

reportRouter.get(
    '/post',
    // adminMiddleware(['admin', 'moderator', 'super-admin']),
    wrapAsync(reportController.getPostReports)
);

reportRouter.get(
    '/account',
    // adminMiddleware(['admin', 'moderator', 'super-admin']),
    authMiddleware,
    wrapAsync(reportController.getAccountReports)
);

reportRouter.get(
    '/question',
    // adminMiddleware(['admin', 'moderator', 'super-admin']),
    authMiddleware,
    wrapAsync(reportController.getQuestionReports)
);

reportRouter.get(
    '/account/:accountId',
    // authMiddleware,
    wrapAsync(reportController.getReportByAccountId)
);

reportRouter.get(
    '/post/:postId',
    // adminMiddleware(['admin', 'moderator', 'super-admin']),
    // authMiddleware,
    wrapAsync(reportController.getReportByPostId)
);

reportRouter.get(
    '/question/:questionId',
    // authMiddleware,
    wrapAsync(reportController.getReportByQuestionId)
);

reportRouter.post(
    '/post/:postId',
    authMiddleware,
    wrapAsync(reportController.reportPost)
);

reportRouter.post(
    '/account/:accountId',
    authMiddleware,
    wrapAsync(reportController.reportAccount)
);

reportRouter.post(
    '/question/:questionId',
    authMiddleware,
    wrapAsync(reportController.reportQuestion)
);

export default reportRouter;
