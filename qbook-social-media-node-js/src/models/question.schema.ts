import { model, Schema, Types, Document, ObjectId } from 'mongoose';

export interface QuestionDocument extends Document {
    userId: ObjectId;
    topic: ObjectId;
    title: string;
    question: string;
    code: { fileType: string; code: string };
    image: string;
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
                enum: [
                    'c',
                    'cpp',
                    'java',
                    'python',
                    'javascript',
                    'typescript',
                ],
            },
            code: String,
        },
        image: { type: String },
        hashtags: [{ type: Schema.ObjectId, ref: 'Hashtag' }],
        vote: [{ type: Schema.ObjectId, ref: 'User' }],
    },
    { timestamps: true }
);

export default model('Question', QuestionSchema);
