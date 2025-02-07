import messageSchema from '../models/message.schema';

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
        const message = await messageSchema.create(data);
        return message;
    }
}

export default new ChatService();
