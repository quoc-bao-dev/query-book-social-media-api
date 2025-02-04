import { Router } from 'express';
import roomChatRoutes from './roomChat.routes';

const router = Router();

router.use('/room-chat', roomChatRoutes);

export default router;
