import { Document, Schema, model } from 'mongoose';

export interface HashtagDocument extends Document {
    name: string;
    usageCount: number;
    createdAt: Date;
    updatedAt: Date;
}

const HashtagSchema = new Schema<HashtagDocument>(
    {
        name: { type: String, required: true, unique: true, trim: true },
        usageCount: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default model<HashtagDocument>('Hashtag', HashtagSchema);
