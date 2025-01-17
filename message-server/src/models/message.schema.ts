import { Document, Schema } from 'mongoose';

export interface MessageDocument extends Document {
    senderId: string;
    roomChatId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const MessageSchema = new Schema<MessageDocument>({
    senderId: { type: String, required: true },
    roomChatId: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
});

export default MessageSchema;
