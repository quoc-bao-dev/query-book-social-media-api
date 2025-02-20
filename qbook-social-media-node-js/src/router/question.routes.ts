import { Router } from 'express';
import QuestionController from '../controllers/question.controller';
import { wrapAsync } from '../core';
import { authMiddleware } from '../middlewares/authMiddleware';

const questionRouter = Router();

questionRouter.get('/', authMiddleware, wrapAsync(QuestionController.getAll));
questionRouter.get(
    '/:id',
    authMiddleware,
    wrapAsync(QuestionController.getByUserId)
);
questionRouter.post('/', authMiddleware, wrapAsync(QuestionController.create));
questionRouter.get(
    '/my-question',
    authMiddleware,
    wrapAsync(QuestionController.getByUserId)
);

export default questionRouter;
