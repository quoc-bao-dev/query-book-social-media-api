import { Router } from 'express';
import QuestionController from '../controllers/question.controller';
import SaveQuestionController from '../controllers/saveQuestion.controller';
import { wrapAsync } from '../core';
import { authMiddleware } from '../middlewares/authMiddleware';

const questionRouter = Router();

questionRouter.get('/', authMiddleware, wrapAsync(QuestionController.getAll));
questionRouter.get(
    '/my-question',
    authMiddleware,
    wrapAsync(QuestionController.getByUserId)
);
questionRouter.get(
    '/save',
    authMiddleware,
    wrapAsync(SaveQuestionController.getByUserId)
);
questionRouter.get('/:id', wrapAsync(QuestionController.getById));

questionRouter.post('/', authMiddleware, wrapAsync(QuestionController.create));
questionRouter.post(
    '/save',
    authMiddleware,
    wrapAsync(SaveQuestionController.create)
);

export default questionRouter;
