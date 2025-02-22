import { Document, model, ObjectId, Schema } from 'mongoose';
interface RoomChatDocument extends Document {
    name: string;
    members: string[];
    isGroup: boolean;
    groupAvatar: string;
    messages: Schema.Types.ObjectId[];
    lastMessage: Schema.Types.ObjectId;
    seenBy: string[];

}

const RoomChatSchema = new Schema<RoomChatDocument>(
    {
        name: { type: String, required: true },
        members: [{ type: String }],
        isGroup: { type: Boolean, default: false },
        groupAvatar: { type: String, default: '' },
        messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
        lastMessage: { type: Schema.Types.ObjectId, ref: 'Message', },
        seenBy: [{ type: String }],

    },
    { timestamps: true }
);

export default model('RoomChat', RoomChatSchema);
