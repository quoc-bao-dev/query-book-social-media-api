import { ObjectId } from 'mongoose';
import { JobTitleDocument } from '../models/jobTitle.schema';
import { MediaDocument } from '../models/media.schema';
import { RoleType, SocialType } from '../models/types/type';
import { UserDocument } from '../models/user.schema';
import { UserProfileDocument } from '../models/userProfile.schema';
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
        const friends = (this.friends as UserDocument[]).map((friend) => {
            return {
                id: friend.id,
                fullName: `${friend.firstName} ${friend.lastName}`,
                handle: friend.handle,
                avatar: friend.avatar,
                professional: friend.professional,
                followerCount: friend.followerCount,
                followingCount: friend.followingCount,
            };
        });

        const followers = (this.followers as UserDocument[]).map((follower) => {
            return {
                id: follower.id,
                fullName: `${follower.firstName} ${follower.lastName}`,
                handle: follower.handle,
                avatar: follower.avatar,
                professional: follower.professional,
                followerCount: follower.followerCount,
                followingCount: follower.followingCount,
            };
        });

        const followings = (this.followings as UserDocument[]).map(
            (following) => {
                return {
                    id: following.id,
                    fullName: `${following.firstName} ${following.lastName}`,
                    handle: following.handle,
                    avatar: following.avatar,
                    professional: following.professional,
                    followerCount: following.followerCount,
                    followingCount: following.followingCount,
                };
            }
        );

        const avatar = new MediaDTO(this.avatar as MediaDocument).toResponse();
        const coverPage = new MediaDTO(
            this.coverPage as MediaDocument
        ).toResponse();

        const projects = this.projects?.map((_project) => {
            return {
                projectName: _project.projectName,
                description: _project.description,
                startDate: _project.startDate,
                endDate: _project.endDate,
                url: _project.url,
            };
        });

        const skills = this.skills?.map((_skill) => {
            return {
                name: _skill.name,
                display: _skill.display,
            };
        });

        const links = this.links?.map((_link) => {
            return {
                title: _link.title,
                url: _link.url,
            };
        });

        const socials = this.socials?.map((_social) => {
            return {
                type: _social.type,
                url: _social.url,
            };
        });
        return {
            id: this.userId,
            firstName: this.firstName,
            lastName: this.lastName,
            fullName: `${this.firstName} ${this.lastName}`,
            handle: this.handle,
            avatar,
            coverPage,
            bio: this.bio,
            phone: this.phone,
            professional: this.professional,
            jobTitle: this.jobTitle,
            socials: socials,
            links: links,
            skills: skills,
            projects: projects,
            friendCount: this.friendCount,
            followerCount: this.followerCount,
            followingCount: this.followingCount,
            friends: friends,
            followers: followers,
            followings: followings,
            interests: this.interests,
            address: this.address,
            createdAt: this.createdAt,
        };
    }

    
}

export default UserProfileDTO;
