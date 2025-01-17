import { Document, model, ObjectId, Schema } from 'mongoose';
import { MediaDocument } from './media.schema';
import { RoleType } from './types/type';

export interface UserDocument extends Document {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    avatar: ObjectId | MediaDocument;
    handle: string;
    professional: string;
    friendCount: number;
    followerCount: number;
    followingCount: number;
    role: RoleType;
    oauthProvider: string;
    isActive: boolean;
    isTwoFactorAuthEnabled: boolean;
    isBlock: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const roles: RoleType[] = ['admin', 'moderator', 'user'];

const UserSchema = new Schema<UserDocument>(
    {
        firstName: { type: String, trim: true },
        lastName: { type: String, trim: true },
        username: { type: String, required: true, unique: true, trim: true },
        password: { type: String, required: true, minlength: 6 },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
        avatar: { type: Schema.Types.ObjectId, ref: 'Media' },
        handle: { type: String, unique: true, required: true, trim: true },
        professional: { type: String, trim: true },
        friendCount: { type: Number, default: 0 },
        followerCount: { type: Number, default: 0 },
        followingCount: { type: Number, default: 0 },
        role: { type: String, enum: roles, default: 'user' },
        oauthProvider: { type: String, trim: true },
        isActive: { type: Boolean, default: false },
        isTwoFactorAuthEnabled: { type: Boolean, default: false },
        isBlock: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// Indexes
UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });

export default model('User', UserSchema);
