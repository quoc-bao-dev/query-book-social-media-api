import { Router } from 'express';
import chatController from '../controllers/chat.controller';

const chatRouter = Router();

chatRouter.get('/roomId/:roomId', chatController.getMessageByRoomChatId);

export default chatRouter;
