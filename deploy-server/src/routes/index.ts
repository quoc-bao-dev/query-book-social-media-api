import { Router } from 'express';
import uploadController from '../controllers/upload.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload';

const router = Router();

router.post(
    '/upload',
    authMiddleware,
    upload.single('file'),
    uploadController.upload
);

export default router;
