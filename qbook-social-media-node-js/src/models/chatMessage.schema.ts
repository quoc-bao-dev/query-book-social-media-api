import { model, ObjectId, Schema, Types } from 'mongoose';

export interface ChatMessageDocument {
    senderId: ObjectId;
    roomChatId: ObjectId;
    content: string;
    seenBy: ObjectId[];
    media: ObjectId[];
}
const ChatMessageSchema = new Schema<ChatMessageDocument>({
    senderId: { type: Types.ObjectId, require: true, ref: 'User' },
    roomChatId: { type: Types.ObjectId, require: true, ref: 'RoomChat' },
    content: { type: String, require: true },
    seenBy: [{ type: Types.ObjectId, ref: 'User' }],
    media: [{ type: Types.ObjectId, ref: 'Media' }],
});

export default model('ChatMessage', ChatMessageSchema);
