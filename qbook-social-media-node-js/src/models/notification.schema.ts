import { Document, model, ObjectId, Schema, Types } from 'mongoose';
interface NotificationDocument extends Document {
    type: 'personal' | 'followers' | 'broadcast';
    recipients: {
        userId: ObjectId;
        isRead: boolean;
    }[];
    target: Types.ObjectId;
    targetType: 'User' | 'Post' | 'Comment';
    message: string;
    metadata: {
        [key: string]: any;
    };
}
const NotificationSchema = new Schema<NotificationDocument>(
    {
        type: {
            type: String,
            enum: ['personal', 'followers', 'broadcast'], // Loại notification
            required: true,
        },

        recipients: [
            {
                userId: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
                }, // ID người nhận
                isRead: { type: Boolean, default: false }, // Trạng thái đã đọc của từng người
            },
        ],

        target: {
            type: Schema.Types.ObjectId,
            refPath: 'targetType',
        },
        targetType: {
            type: String,
            enum: ['User', 'Post', 'Comment'],
        },

        message: { type: String, required: true },
        metadata: { type: Object },
    },
    { timestamps: true }
);

export default model('Notification', NotificationSchema);
