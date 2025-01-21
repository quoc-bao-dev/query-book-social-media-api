import { Document, model, ObjectId, Schema } from 'mongoose';
import { SocialType } from './types/type';
import { UserDocument } from './user.schema';
import { MediaDocument } from './media.schema';
import { JobTitleDocument } from './jobTitle.schema';

export interface UserProfileDocument extends Document {
    userId: ObjectId;
    bio?: string;
    phone?: string;
    coverPage?: ObjectId | MediaDocument;
    jobTitle?: ObjectId | JobTitleDocument;
    socials?: {
        type: SocialType;
        url: string;
    }[];
    links?: {
        title: string;
        url: string;
    }[];
    skills?: {
        name: string;
        display: string;
    }[];
    projects?: {
        projectName: string;
        description: string;
        startDate: Date;
        endDate: Date;
        url: string;
    }[];
    friends?: ObjectId[] | UserDocument[];
    followers?: ObjectId[] | UserDocument[];
    followings?: ObjectId[] | UserDocument[];
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
        },
        bio: { type: String, trim: true },
        phone: { type: String, match: /^[0-9]{10,15}$/ },
        coverPage: { type: Schema.Types.ObjectId, ref: 'Media' },
        jobTitle: { type: Schema.Types.ObjectId, ref: 'JobTitle' },
        socials: [
            {
                type: {
                    type: String,
                    enum: socials,
                    required: true,
                },
                url: { type: String },
            },
        ],
        links: [
            {
                title: { type: String, trim: true },
                url: { type: String },
            },
        ],
        skills: [
            {
                name: { type: String, trim: true },
                display: { type: String, trim: true },
            },
        ],
        projects: [
            {
                projectName: {
                    type: String,
                    trim: true,
                },
                description: {
                    type: String,
                    trim: true,
                },
                startDate: {
                    type: Date,
                    validate: {
                        validator: (v: string) => {
                            return Boolean(
                                Date.parse(v) && !isNaN(new Date(v).getTime())
                            );
                        },
                        message: (props: { value: string }) =>
                            `${props.value} is not a valid ISO date string`,
                    },
                },
                endDate: {
                    type: Date,
                    validate: {
                        validator: (v: string) => {
                            return Boolean(
                                Date.parse(v) && !isNaN(new Date(v).getTime())
                            );
                        },
                        message: (props: { value: string }) =>
                            `${props.value} is not a valid ISO date string`,
                    },
                },
                url: {
                    type: String,
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
            },
        ],
        address: [{ type: Schema.Types.ObjectId, ref: 'Addresses' }],
    },
    { timestamps: true }
);

// Indexes
UserProfileSchema.index({ userId: 1 }, { unique: true });

export default model('UserProfile', UserProfileSchema);
