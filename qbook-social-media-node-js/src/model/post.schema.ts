import { model, ObjectId, Schema } from 'mongoose';
import { HashtagDocument } from './hashtag.schema';
import { MediaDocument } from './media.schema';

export interface PostDocument extends Document {
    userId: ObjectId;
    content: string;
    likes: (string | ObjectId)[];
    comments: (string | ObjectId)[];
    hashTags: (string | HashtagDocument)[];
    media: (string | MediaDocument)[];
    status: string;
    view: number;
    interestScore: number;
    isBlocked: boolean;
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
    },
    { timestamps: true }
);

export default model('Post', PostSchema);
