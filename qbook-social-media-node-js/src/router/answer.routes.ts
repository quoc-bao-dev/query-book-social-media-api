import { Router } from 'express';
import { wrapAsync } from '../core';
import answerController from '../controllers/answer.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const answerRouter = Router();

answerRouter.get('/:questionId', wrapAsync(answerController.getByQuestionId));

answerRouter.post('/', authMiddleware, wrapAsync(answerController.create));

export default answerRouter;
