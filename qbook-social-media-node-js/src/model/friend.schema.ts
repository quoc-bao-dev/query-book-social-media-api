import { Schema, model, Document, ObjectId } from 'mongoose';

interface FriendDocument extends Document {
    users: [ObjectId, ObjectId];
    intimacyScore: number;
    createdAt: Date;
}

const FriendSchema = new Schema<FriendDocument>(
    {
        users: {
            type: [Schema.Types.ObjectId],
            required: true,
            validate: {
                validator: (arr: string[]) => arr.length === 2,
                message: 'The "users" array must contain exactly 2 user IDs.',
            },
        },
        intimacyScore: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    { timestamps: true }
);

export default model<FriendDocument>('Friend', FriendSchema);
