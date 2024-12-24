import { Document, model, ObjectId, Schema } from 'mongoose';

export interface StoryDocument extends Document {
    userId: ObjectId;
    content: string;
    media: string;
    viewer: ObjectId[];
    expireAt: Date;
}

const StorySchema = new Schema<StoryDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        content: { type: String, required: true },
        media: { type: String, ref: 'Media' },
        viewer: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        expireAt: { type: Date, required: true },
    },
    { timestamps: true }
);

export default model('Story', StorySchema);
