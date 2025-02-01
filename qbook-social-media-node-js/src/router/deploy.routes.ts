import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import deployController from '../controllers/deploy.controller';
import { wrapAsync } from '../core';
import { upload } from '../middlewares/upload.middleware';

const deployRouter = Router();

deployRouter.get(
    '/',
    authMiddleware,
    wrapAsync(deployController.getHostingByUserId)
);

deployRouter.post(
    '/upload',
    authMiddleware,
    upload.single('file'),
    wrapAsync(deployController.upload)
);

deployRouter.post(
    '/create-hosting',
    authMiddleware,
    wrapAsync(deployController.createHosting)
);

deployRouter.delete(
    '/delete-hosting/:subDomain',
    authMiddleware,
    wrapAsync(deployController.delete)
);
export default deployRouter;
