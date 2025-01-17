import { Document, model, Schema } from 'mongoose';
import { AdminRoleType } from './types/type';

export interface AdminDocument extends Document {
    username: string;
    password: string;
    email: string;
    avatar: string;
    role: AdminRoleType;
}

const AdminSchema = new Schema<AdminDocument>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    role: {
        type: String,
        enum: ['super-admin', 'admin', 'moderator'],
        default: 'admin',
    },
});

export default model<AdminDocument>('Admin', AdminSchema);
