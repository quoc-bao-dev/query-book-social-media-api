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
            .select('content senderId createdAt updatedAt');
        return message;
    }

    async createMessage(data: any) {
        const roomId = data.roomChatId;

        const message = await messageSchema.create(data);
        await roomChatSchema.updateOne(
            { _id: roomId },
            { lastMessage: message._id }
        );

        return message;
    }
}

export default new ChatService();
