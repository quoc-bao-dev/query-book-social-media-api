import { Request, Response } from 'express';
import chatService from '../service/chat.service';

const chatController = {
    getMessageByRoomChatId: async (req: Request, res: Response) => {
        const { limit, page } = req.query;
        const { roomId } = req.params;

        const result = await chatService.getMessageByRoomChatId(
            roomId,
            Number(limit),
            Number(page)
        );

        res.json(result);
    },
};

export default chatController;
