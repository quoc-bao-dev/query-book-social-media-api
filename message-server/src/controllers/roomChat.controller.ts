import { Request, Response } from 'express';
import roomChatService from '../service/roomChat.service';

const roomChatController = {
    getRoomChatById: async (req: Request, res: Response) => {
        const roomChatId = req.params.roomChatId;
        if (!roomChatId) {
            res.status(400).json({ message: 'RoomChat ID is required' });
            return;
        }
        const data = await roomChatService.getRoomChatById(roomChatId);
        res.status(200).json(data);
    },
    getRoomChatByUserId: async (req: Request, res: Response) => {
        const userId = req.params.userId;
        if (!userId) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }
        const data = await roomChatService.getRoomChatByUserId(userId);
        res.status(200).json(data);
    },

    getRoomChatByFriendId: async (req: Request, res: Response) => {
        const userId = req.params.userId;
        const friendId = req.params.friendId;
        if (!userId || !friendId) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }
        const data = await roomChatService.getRoomChatByFriendId(
            userId,
            friendId
        );

        res.status(200).json(data);
    },

    createRoomChat: async (req: Request, res: Response) => {
        const data = await roomChatService.createRoomChat(req.body);
        res.status(200).json(data);
    },
};

export default roomChatController;
