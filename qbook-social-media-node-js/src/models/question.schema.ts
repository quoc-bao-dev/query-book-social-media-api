import { model, Schema, Types, Document, ObjectId } from 'mongoose';
import { languages } from './types/answer.type';

export interface QuestionDocument extends Document {
    userId: ObjectId;
    topic: ObjectId;
    title: string;
    question: string;
    code: { fileType: string; code: string };
    images: string[];
    vote: ObjectId[];
    hashtags: ObjectId[];
}

const QuestionSchema = new Schema<QuestionDocument>(
    {
        userId: { type: Types.ObjectId, ref: 'User', require: true },
        topic: { type: Types.ObjectId, ref: 'Topic', require: true },
        title: { type: String },
        question: { type: String, require: true },
        code: {
            fileType: {
                type: String,
                enum: languages,
            },
            code: String,
        },
        images: [{ type: String }],
        hashtags: [{ type: Schema.ObjectId, ref: 'Hashtag' }],
        vote: [{ type: Schema.ObjectId, ref: 'User' }],
    },
    { timestamps: true }
);

export default model('Question', QuestionSchema);
