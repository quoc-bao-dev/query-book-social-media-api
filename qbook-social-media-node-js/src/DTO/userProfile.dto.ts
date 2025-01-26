import { ObjectId } from 'mongoose';
import { JobTitleDocument } from '../models/jobTitle.schema';
import { MediaDocument } from '../models/media.schema';
import { RoleType, SocialType } from '../models/types/type';
import { UserDocument } from '../models/user.schema';
import { UserProfileDocument } from '../models/userProfile.schema';
import mediaService from '../services/media.service';
import MediaDTO from './media.dto';

class UserProfileDTO {
    id: string;
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

    constructor(payload: UserProfileDocument & UserDocument) {
        this.id = payload.id;
        this.firstName = payload.firstName;
        this.lastName = payload.lastName;
        this.username = payload.username;
        this.password = payload.password;
        this.email = payload.email;
        this.avatar = payload.avatar;
        this.handle = payload.handle;
        this.professional = payload.professional;
        this.friendCount = payload.friendCount;
        this.followerCount = payload.followerCount;
        this.followingCount = payload.followingCount;
        this.role = payload.role;
        this.oauthProvider = payload.oauthProvider;
        this.isActive = payload.isActive;
        this.isTwoFactorAuthEnabled = payload.isTwoFactorAuthEnabled;
        this.isBlock = payload.isBlock;
        this.userId = payload.userId;
        this.bio = payload.bio;
        this.phone = payload.phone;
        this.coverPage = payload.coverPage;
        this.jobTitle = payload.jobTitle;
        this.socials = payload.socials;
        this.links = payload.links;
        this.skills = payload.skills;
        this.projects = payload.projects;
        this.friends = payload.friends;
        this.followers = payload.followers;
        this.followings = payload.followings;
        this.interests = payload.interests;
        this.address = payload.address;
        this.createdAt = payload.createdAt;
        this.updatedAt = payload.updatedAt;
    }

    toPublish() {
        const mapUserData = (users: UserDocument[]) =>
            users.map((user) => {
                const avatar =
                    user.avatar && new MediaDTO(user.avatar as MediaDocument);
                return {
                    id: user.id,
                    fullName: `${user.firstName} ${user.lastName}`,
                    handle: user.handle,
                    avatar: avatar?.toResponse(),
                    avatarUrl: avatar?.toUrl(),
                    professional: user.professional,
                    followerCount: user.followerCount,
                    followingCount: user.followingCount,
                };
            });

        const mapSimpleData = (data: any[], fields: string[]) =>
            data?.map((item) => {
                const result: Record<string, any> = {};
                fields.forEach((field) => {
                    result[field] = item[field];
                });
                return result;
            });

        const avatar =
            this.avatar && new MediaDTO(this.avatar as MediaDocument);

        const coverPage =
            this.coverPage && new MediaDTO(this.coverPage as MediaDocument);

        return {
            id: this.userId,
            firstName: this.firstName,
            lastName: this.lastName,
            fullName: `${this.firstName} ${this.lastName}`,
            handle: this.handle,
            email: this.email,
            avatar: avatar?.toResponse(),
            avatarUrl: avatar?.toUrl(),
            coverPage: coverPage?.toResponse(),
            coverPageUrl: coverPage?.toUrl(),
            bio: this.bio,
            phone: this.phone,
            professional: this.professional,
            jobTitle: this.jobTitle,
            socials: this.socials
                ? mapSimpleData(this.socials, ['type', 'url'])
                : [],
            links: this.links
                ? mapSimpleData(this.links, ['title', 'url'])
                : [],
            skills: this.skills
                ? mapSimpleData(this.skills, ['name', 'display'])
                : [],
            projects: this.projects
                ? mapSimpleData(this.projects, [
                      'projectName',
                      'description',
                      'startDate',
                      'endDate',
                      'url',
                  ])
                : [],
            friendCount: this.friendCount,
            followerCount: this.followerCount,
            followingCount: this.followingCount,
            friends: mapUserData(this.friends as UserDocument[]),
            followers: mapUserData(this.followers as UserDocument[]),
            followings: mapUserData(this.followings as UserDocument[]),
            interests: this.interests,
            address: this.address,
            createdAt: this.createdAt,
        };
    }
}

export default UserProfileDTO;
