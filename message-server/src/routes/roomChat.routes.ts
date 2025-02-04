import { Router } from 'express';
import roomChatController from '../controllers/roomChat.controller';

const roomChatRoutes = Router();

roomChatRoutes.get('/room-id/:roomChatId', roomChatController.getRoomChatById);
roomChatRoutes.get('/user/:userId', roomChatController.getRoomChatByUserId);
roomChatRoutes.get(
    '/user/:userId/friend/:friendId',
    roomChatController.getRoomChatByFriendId
);
roomChatRoutes.post('/create', roomChatController.createRoomChat);

export default roomChatRoutes;
