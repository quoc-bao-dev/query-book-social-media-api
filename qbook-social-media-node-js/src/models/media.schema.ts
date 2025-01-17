import { Document, model, ObjectId, Schema } from 'mongoose';
import { MediaType } from './types/media.type';

export interface MediaDocument extends Document {
    userId?: ObjectId;
    file?: string;
    url?: string;
    type: MediaType;
    sourceType: string;
    createdAt: Date;
    updatedAt: Date;
}

const MediaSchema = new Schema<MediaDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        url: { type: String },
        file: { type: String },
        sourceType: { type: String, required: true, enum: ['url', 'file'] },
        type: { type: String, enum: ['image', 'video'], required: true },
    },
    { timestamps: true }
);

export default model<MediaDocument>('Media', MediaSchema);
