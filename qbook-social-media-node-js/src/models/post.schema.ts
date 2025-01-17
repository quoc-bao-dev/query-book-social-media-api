import { model, ObjectId, Schema, Document } from 'mongoose';
import { HashtagDocument } from './hashtag.schema';
import { MediaDocument } from './media.schema';
import { UserDocument } from './user.schema';
import { LikeDocument } from './like.schema';
import { CommentDocument } from './comment.schema';
import { PostStatusType } from './types/type';

export interface PostDocument extends Document {
    userId: ObjectId | UserDocument;
    content: string;
    likes: (string | LikeDocument)[];
    comments: (string | CommentDocument)[];
    hashTags: (string | HashtagDocument)[];
    media: (string | MediaDocument)[];
    status: PostStatusType;
    view: number;
    interestScore: number;
    isBlocked: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
const PostSchema = new Schema<PostDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        content: { type: String, required: true },
        likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }],
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
        hashTags: [{ type: Schema.Types.ObjectId, ref: 'Hashtag' }],
        media: [{ type: Schema.Types.ObjectId, ref: 'Media' }],
        status: {
            type: String,
            enum: ['public', 'private', 'hidden', 'friend'],
            required: true,
            default: 'public',
        },
        view: { type: Number, default: 0 },
        interestScore: { type: Number, default: 0 },
        isBlocked: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default model('Post', PostSchema);
