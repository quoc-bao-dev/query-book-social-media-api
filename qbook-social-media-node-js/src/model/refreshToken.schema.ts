import { Document, model, ObjectId, Schema } from 'mongoose';

export interface RefreshTokenDocument extends Document {
    userId: ObjectId;
    refreshToken: string;
    expiresAt: Date;
}

const RefreshTokenSchema = new Schema<RefreshTokenDocument>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    refreshToken: { type: String, required: true },
    expiresAt: { type: Date, required: true },
});

export default model('RefreshToken', RefreshTokenSchema);
