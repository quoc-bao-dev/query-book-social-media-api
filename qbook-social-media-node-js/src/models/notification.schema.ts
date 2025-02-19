import { Document, model, Schema } from 'mongoose';
interface NotificationDocument extends Document {
    type: 'relationship';
    relationType: 'accept_request' | 'follow';
    senderId: Schema.Types.ObjectId;
    targetId: Schema.Types.ObjectId;
    recipients: [
        {
            user: { type: Schema.Types.ObjectId; ref: 'User' };
            isRead: boolean;
        }
    ];
    message: string;
    timeEnd: Date;
}
const NotificationSchema = new Schema<NotificationDocument>(
    {
        type: { type: String, enum: ['relationship'] },
        relationType: {
            type: String,
            enum: ['accept_request', 'follow'],
        },
        senderId: { type: Schema.Types.ObjectId, ref: 'User' },
        targetId: { type: Schema.Types.ObjectId, ref: 'User' },
        recipients: [
            {
                userId: { type: Schema.Types.ObjectId, ref: 'User' },
                isRead: Boolean,
            },
        ],
        message: String,
        timeEnd: Date,
    },

    { timestamps: true }
);

export default model('Notification', NotificationSchema);
