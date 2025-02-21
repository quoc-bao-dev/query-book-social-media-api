import { Document, model, ObjectId, Schema, Types } from 'mongoose';

export interface AnswerDocument extends Document {
    userId: ObjectId;
    questionId: ObjectId;
    content: String;
    code: { type: String; code: String };
    vote: ObjectId[];
}

const AnswerSchema = new Schema<AnswerDocument>(
    {
        userId: { type: Types.ObjectId, require: true, ref: 'User' },
        questionId: { type: Types.ObjectId, require: true, ref: 'Question' },
        content: { type: String, require: true },
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
        vote: [{ type: Types.ObjectId, ref: 'User' }],
    },
    { timestamps: true }
);

export default model('Answer', AnswerSchema);
