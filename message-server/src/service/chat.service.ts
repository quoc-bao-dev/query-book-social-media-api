import { config } from '../config';
import messageSchema from '../models/message.schema';
import roomChatSchema from '../models/roomChat.schema';

class ChatService {
    async getMessageByRoomChatId(
        roomChatId: string,
        limit: number = 50,
        page: number = 1
    ) {
        const message = await messageSchema
            .find({ roomChatId })
            .sort({
                createdAt: -1,
            })
            .limit(limit)
            .skip((page - 1) * limit)
            .select('content senderId createdAt updatedAt images');
        const result = message.map((item) => ({
            ...item.toObject(),
            images: item.images.map((image) => `${ config.IMAGE_URL }/${ image }`),
        }))

        return result;
    }

    async createMessage(data: any) {
        const roomId = data.roomChatId;
        const senderId = data.senderId;

        const message = await messageSchema.create(data);
        await roomChatSchema.updateOne(
            { _id: roomId },
            { lastMessage: message._id, seenBy: [senderId] }
        );

        return message;
    }
}

export default new ChatService();
