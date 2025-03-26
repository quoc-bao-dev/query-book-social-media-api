import { Document, model, Schema } from 'mongoose';

export interface TopicDocument extends Document {
    name: string;
    description: string;
    interestScore: number;
}

const TopicSchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    interestScore: { type: Number, default: 0, min: 0 },
});

export default model('Topic', TopicSchema);
