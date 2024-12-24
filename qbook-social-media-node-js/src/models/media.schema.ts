import { Document, model, ObjectId, Schema } from 'mongoose';

export type MediaType = 'image' | 'video';
export interface MediaDocument extends Document {
    userId: ObjectId;
    url: string;
    type: MediaType;
    createdAt: Date;
    updatedAt: Date;
}

const MediaSchema = new Schema<MediaDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        url: { type: String, required: true },
        type: { type: String, enum: ['image', 'video'], required: true },
    },
    { timestamps: true }
);

export default model<MediaDocument>('Media', MediaSchema);
