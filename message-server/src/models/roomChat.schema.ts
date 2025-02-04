import { Document, model, Schema } from 'mongoose';
interface RoomChatDocument extends Document {
    name: string;
    members: string[];
    isGroup: boolean;
    groupAvatar: string;
    messages: string[];
}

const RoomChatSchema = new Schema<RoomChatDocument>(
    {
        name: { type: String, required: true },
        members: [{ type: String }],
        isGroup: { type: Boolean, default: false },
        groupAvatar: { type: String, default: '' },
        messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    },
    { timestamps: true }
);

export default model('RoomChat', RoomChatSchema);
