import { Document, model, Schema } from 'mongoose';

export type SaveQuestion = {
    userId: Schema.Types.ObjectId;
    questionId: Schema.Types.ObjectId;
} & Document;

const SaveQuestionSchema = new Schema<SaveQuestion>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
    },
});
export default model('SaveQuestion', SaveQuestionSchema);
