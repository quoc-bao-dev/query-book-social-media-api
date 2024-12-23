import { Document, model, ObjectId, Schema } from 'mongoose';

export interface RoomChatDocument extends Document {
    name: string;
    members: ObjectId[];
    isGroup: boolean;
    groupAvatar: string;
    messages: string[];
}
const RoomChatSchema = new Schema<RoomChatDocument>({
    name: { type: String, required: true },
    members: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        required: true,
    },
    isGroup: { type: Boolean, default: false },
    groupAvatar: { type: String, default: '' },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
});

export default model('RoomChat', RoomChatSchema);
