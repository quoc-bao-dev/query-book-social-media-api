import { Schema, model, Document, ObjectId } from 'mongoose';

interface PendingRequestDocument extends Document {
    senderId: ObjectId;
    receiverId: ObjectId;
    requestType: 'friend' | 'follow';
    status: 'pending' | 'accepted' | 'rejected';
    createdAt: Date;
    updatedAt: Date;
}

const PendingRequestSchema = new Schema<PendingRequestDocument>(
    {
        senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        receiverId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        requestType: {
            type: String,
            enum: ['friend', 'follow'],
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending',
        },
    },
    { timestamps: true }
);

export default model<PendingRequestDocument>(
    'PendingRequest',
    PendingRequestSchema
);
