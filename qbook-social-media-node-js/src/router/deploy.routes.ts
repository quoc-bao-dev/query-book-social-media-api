import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import deployController from '../controllers/deploy.controller';
import { wrapAsync } from '../core';
import { upload } from '../middlewares/upload.middleware';

const deployRouter = Router();

deployRouter.post(
    '/upload',
    authMiddleware,
    upload.single('file'),
    wrapAsync(deployController.upload)
);
export default deployRouter;
