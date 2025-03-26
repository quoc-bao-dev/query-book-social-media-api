import { Document, model, ObjectId, Schema, Types } from 'mongoose';
import { languages } from './types/answer.type';

export interface AnswerDocument extends Document {
    userId: ObjectId;
    questionId: ObjectId;
    content: String;
    code: { type: String; code: String };
    images: String[];
    votes: ObjectId[];
}

const AnswerSchema = new Schema<AnswerDocument>(
    {
        userId: { type: Types.ObjectId, require: true, ref: 'User' },
        questionId: { type: Types.ObjectId, require: true, ref: 'Question' },
        content: { type: String, require: true },
        code: {
            fileType: {
                type: String,
                enum: languages,
            },
            code: String,
        },
        images: [{ type: String }],
        votes: [
            {
                user: { type: Types.ObjectId, ref: 'User' },
                voteType: { type: String, enum: ['up', 'down'] },
            },
        ],
    },
    { timestamps: true }
);

export default model('Answer', AnswerSchema);
