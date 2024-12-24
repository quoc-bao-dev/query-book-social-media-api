import { Document, model, Schema } from 'mongoose';

export interface TopicDocument extends Document {
    name: string;
    description: string;
    interestScore: number;
}

const TopicSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    interestScore: { type: Number, default: 0 },
});

export default model('Topic', TopicSchema);
