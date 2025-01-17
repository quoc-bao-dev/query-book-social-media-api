import { model, ObjectId, Schema } from 'mongoose';
import { UserDocument } from './user.schema';

export interface LikeDocument {
    userId: ObjectId | UserDocument;
    postId: ObjectId;
    commentId: ObjectId;
    type: 'post' | 'comment';
}

const likeSchema = new Schema<LikeDocument>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'Post' },
    commentId: { type: Schema.Types.ObjectId, ref: 'Comment' },
    type: { type: String, enum: ['post', 'comment'], required: true },
});

export default model('Like', likeSchema);
