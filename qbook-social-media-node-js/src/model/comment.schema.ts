import { Document, model, ObjectId, Schema } from 'mongoose';

export interface CommentDocument extends Document {
    userId: ObjectId;
    postId: ObjectId;
    content: string;
    post: ObjectId;
    isReply: boolean;
    parent: ObjectId;
    likes: string[];
    replies: string[];
    createdAt: Date;
    updatedAt: Date;
}
const CommentSchema = new Schema<CommentDocument>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    content: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isReply: { type: Boolean, default: false },
    parent: { type: Schema.Types.ObjectId, ref: 'Comment' },
    replies: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
});

export default model('Comment', CommentSchema);
