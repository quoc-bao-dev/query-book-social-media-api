import { Router } from 'express';
import chatRouter from './chat.routes';
import roomChatRoutes from './roomChat.routes';

const router = Router();

router.use('/message', chatRouter);
router.use('/room-chat', roomChatRoutes);

export default router;
