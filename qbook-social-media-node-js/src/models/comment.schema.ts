import { Document, model, ObjectId, Schema } from 'mongoose';
import { UserDocument } from './user.schema';
import { LikeDocument } from './like.schema';
import { MediaDocument } from './media.schema';

export interface CommentDocument extends Document {
    userId: ObjectId | UserDocument;
    postId: ObjectId;
    content: string;
    isReply: boolean;
    parent: ObjectId;
    likes: string[] | LikeDocument[];
    media?: string | MediaDocument;
    replies: CommentDocument[];
    createdAt: Date;
    updatedAt: Date;
}
const CommentSchema = new Schema<CommentDocument>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'Post' },
    content: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isReply: { type: Boolean, default: false },
    parent: { type: Schema.Types.ObjectId, ref: 'Comment' },
    media: { type: Schema.Types.ObjectId, ref: 'Media' },
    replies: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
});

export default model('Comment', CommentSchema);
