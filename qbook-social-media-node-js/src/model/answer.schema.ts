import { Document, model, ObjectId, Schema, Types } from 'mongoose';

export interface AnswerDocument extends Document {
    userId: ObjectId;
    content: String;
    code: { type: String; code: String };
    vote: ObjectId[];
}

const AnswerSchema = new Schema({
    userId: { type: Types.ObjectId, require: true },
    content: { type: Types.ObjectId, require: true },
    code: { type: { fileType: String, code: String } },
    vote: [{ type: Types.ObjectId }],
});

export default model('Answer', AnswerSchema);
