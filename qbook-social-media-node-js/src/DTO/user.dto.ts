import { ObjectId } from 'mongoose';
import { MediaDocument } from '../models/media.schema';
import { RoleType } from '../models/types/type';
import { UserDocument } from '../models/user.schema';
import MediaDTO from './media.dto';

export class UserDTO {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    avatar: ObjectId | MediaDocument | MediaDocument[];
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

    constructor(payload: UserDocument) {
        this.id = (payload._id as ObjectId).toString();
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
        this.createdAt = payload.createdAt;
        this.updatedAt = payload.updatedAt;
    }

    toResponse() {
        const avatar =
            this.avatar && new MediaDTO(this.avatar as MediaDocument);
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            fullName: `${this.firstName} ${this.lastName}`,
            username: this.username,
            email: this.email,
            avatar: avatar?.toResponse(),
            avatarUrl: avatar?.toUrl(),
            handle: this.handle,
            professional: this.professional,
            friendCount: this.friendCount,
            followerCount: this.followerCount,
            followingCount: this.followingCount,
            role: this.role,
            isBlock: this.isBlock,
            createdAt: this.createdAt,
        };
    }

    toSuggestion() {
        const avatar =
            this.avatar &&
            (this.avatar as MediaDocument[]).length > 0 &&
            new MediaDTO((this.avatar as MediaDocument[])[0] as MediaDocument);

        return {
            id: this.id,
            fullName: `${this.firstName} ${this.lastName}`,
            professional: this.professional,
            username: this.username,
            email: this.email,
            avatarUrl: avatar && avatar?.toUrl(),
            handle: this.handle,
        };
    }

    toUserRequest() {
        const avatar =
            this.avatar && new MediaDTO(this.avatar as MediaDocument);

        return {
            id: this.id,
            fullName: `${this.firstName} ${this.lastName}`,
            username: this.username,
            email: this.email,
            avatar: avatar?.toUrl(),
            handle: this.handle,
        };
    }
}
