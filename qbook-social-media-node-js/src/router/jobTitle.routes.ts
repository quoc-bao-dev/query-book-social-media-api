import { Router } from 'express';
import jobTitleController from '../controllers/jobTitle.controller';
import { wrapAsync } from '../core';
import { adminMiddleware } from '../middlewares/adminMiddleware';

const jobTitleRouter = Router();

jobTitleRouter.get('/', wrapAsync(jobTitleController.getJobTitles));

jobTitleRouter.post(
    '/',
    adminMiddleware(['admin', 'super-admin']),
    wrapAsync(jobTitleController.create)
);

export default jobTitleRouter;
