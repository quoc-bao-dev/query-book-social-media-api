import { Document, Schema, model } from 'mongoose';

export interface JobTitleDocument extends Document {
    title: string;
    description?: string;
    popularity: number;
}

const JobTitleSchema = new Schema<JobTitleDocument>(
    {
        title: { type: String, required: true, unique: true },
        description: { type: String },
        popularity: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default model<JobTitleDocument>('JobTitle', JobTitleSchema);
