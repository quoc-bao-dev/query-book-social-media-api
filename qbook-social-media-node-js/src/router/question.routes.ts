import { Router } from 'express';
import QuestionController from '../controllers/question.controller';
import { wrapAsync } from '../core';
import { authMiddleware } from '../middlewares/authMiddleware';

const questionRouter = Router();

questionRouter.get('/', authMiddleware, wrapAsync(QuestionController.getAll));
questionRouter.get(
    '/my-question',
    authMiddleware,
    wrapAsync(QuestionController.getByUserId)
);
questionRouter.get('/:id', wrapAsync(QuestionController.getById));
questionRouter.post('/', authMiddleware, wrapAsync(QuestionController.create));

export default questionRouter;
