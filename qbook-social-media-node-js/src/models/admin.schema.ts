import { Document, model, ObjectId, Schema } from 'mongoose';
import { AdminRoleType } from './types/type';

export interface AdminDocument extends Document {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    avatar: string;
    address: ObjectId;
    bio: string;
    role: AdminRoleType;
    createdAt: Date;
    updatedAt: Date;
}

const AdminSchema = new Schema<AdminDocument>(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        avatar: { type: String },
        role: {
            type: String,
            enum: ['super-admin', 'admin', 'moderator'],
            default: 'admin',
        },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        bio: { type: String },
        address: { type: Schema.Types.ObjectId, ref: 'Address' },
    },
    { timestamps: true }
);

export default model<AdminDocument>('Admin', AdminSchema);
