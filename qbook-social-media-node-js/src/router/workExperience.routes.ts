import { Router } from 'express';
import { wrapAsync } from '../core';
import workExperienceController from '../controllers/workExperience.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const workExperienceRouter = Router();

workExperienceRouter.get('/', wrapAsync(workExperienceController.getAll));

workExperienceRouter.get('/:id', wrapAsync(workExperienceController.get));

workExperienceRouter.post(
    '/',
    authMiddleware,
    wrapAsync(workExperienceController.create)
);

workExperienceRouter.patch(
    '/:id',
    authMiddleware,
    wrapAsync(workExperienceController.update)
);

workExperienceRouter.delete(
    '/:id',
    authMiddleware,
    wrapAsync(workExperienceController.delete)
);

export default workExperienceRouter;
