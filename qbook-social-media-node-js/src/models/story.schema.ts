import { Document, model, ObjectId, Schema } from 'mongoose';
import { MediaDocument } from './media.schema';
import { UserDocument } from './user.schema';

export interface StoryDocument extends Document {
    userId: ObjectId | UserDocument;
    content: string;
    media: string | MediaDocument;
    status: 'public' | 'private' | 'hidden' | 'friend';
    viewer: ObjectId[] | UserDocument[];
    expireAt: Date;
    createdAt: Date;
}

const StorySchema = new Schema<StoryDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        content: { type: String, required: true },
        media: { type: String, ref: 'Media' },
        viewer: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        expireAt: { type: Date, required: true, index: { expires: 0 } },
    },
    { timestamps: true }
);

export default model('Story', StorySchema);
