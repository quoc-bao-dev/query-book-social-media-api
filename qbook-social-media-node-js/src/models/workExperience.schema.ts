import { Document, ObjectId, Schema, model } from 'mongoose';

export interface WorkExperienceDocument extends Document {
    userId: ObjectId;
    jobTitleId: ObjectId;
    company: string;
    startDate?: Date;
    endDate?: Date;
    isCurrent: boolean;
    description?: string;
}

const WorkExperienceSchema = new Schema<WorkExperienceDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        jobTitleId: {
            type: Schema.Types.ObjectId,
            ref: 'JobTitle',
            required: true,
        },
        company: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        isCurrent: { type: Boolean, default: false },
        description: { type: String },
    },
    { timestamps: true }
);

export default model<WorkExperienceDocument>(
    'WorkExperience',
    WorkExperienceSchema
);
