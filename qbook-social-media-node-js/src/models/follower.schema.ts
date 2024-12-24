import { Document, ObjectId, Schema, model } from 'mongoose';

interface FollowerDocument extends Document {
    userId: ObjectId;
    followerId: ObjectId;
    createdAt: Date;
}

const FollowerSchema = new Schema<FollowerDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        followerId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

export default model<FollowerDocument>('Follower', FollowerSchema);
