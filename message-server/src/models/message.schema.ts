import { Document, model, Schema } from 'mongoose';

export interface MessageDocument extends Document {
    images: string[]
    senderId: string;
    roomChatId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const MessageSchema = new Schema<MessageDocument>(
    {
        senderId: { type: String, required: true },
        roomChatId: { type: String, required: true },
        images: [{ type: String }],
        content: { type: String },
    },
    { timestamps: true }
);

export default model('Message', MessageSchema);
