import { Document, model, ObjectId, Schema, Types } from 'mongoose';
import { SocialType } from './types/type';

export interface UserProfileDocument extends Document {
    userId: ObjectId;
    bio?: string;
    phone?: string;
    coverPage?: string;
    jobTitle?: ObjectId;
    socials?: {
        type: SocialType;
        link: string;
    }[];
    links?: {
        title: string;
        link: string;
    }[];
    skills?: string[];
    projects?: {
        projectName: string;
        link: string;
    }[];
    friends?: ObjectId[];
    followers?: ObjectId[];
    followings?: ObjectId[];
    interests?: {
        topic: ObjectId;
        hashtag: ObjectId;
        popularity: number;
    }[];
    address?: ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}

const socials: SocialType[] = [
    'facebook',
    'linkedin',
    'instagram',
    'github',
    'bechance',
];

const UserProfileSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        bio: { type: String, trim: true },
        phone: { type: String, match: /^[0-9]{10,15}$/ },
        coverPage: { type: String, trim: true },
        jobTitle: { type: Schema.Types.ObjectId, ref: 'JobTitle' },
        socials: [
            {
                type: {
                    type: String,
                    enum: socials,
                    required: true,
                },
                link: { type: String, match: /^https?:\/\/[^\s$.?#].[^\s]*$/ },
            },
        ],
        links: [
            {
                title: { type: String, trim: true },
                link: { type: String, match: /^https?:\/\/[^\s$.?#].[^\s]*$/ },
            },
        ],
        skills: [{ type: String, trim: true }],
        projects: [
            {
                projectName: {
                    type: String,
                    trim: true,
                },
                link: {
                    type: String,
                    match: /^https?:\/\/[^\s$.?#].[^\s]*$/,
                },
            },
        ],
        friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        followings: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        interests: [
            {
                topic: { type: String, trim: true, ref: 'Topic' },
                hashtag: { type: String, trim: true, ref: 'Hashtag' },
                popularity: { type: Number, default: 0 },
                ref: 'Hashtag',
            },
        ],
        address: [{ type: Schema.Types.ObjectId, ref: 'Addresses' }],
    },
    { timestamps: true }
);

// Indexes
UserProfileSchema.index({ userId: 1 }, { unique: true });

export default model('UserProfile', UserProfileSchema);
