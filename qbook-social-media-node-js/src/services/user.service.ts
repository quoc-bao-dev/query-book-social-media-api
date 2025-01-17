import ApiError from '../core/ApiError';
import { UserDTO } from '../DTO/user.dto';
import UserProfileDTO from '../DTO/userProfile.dto';
import { UpdateMediaInput } from '../models/types/media.type';
import { UpdateUserServiceInput } from '../models/types/user.type';
import User, { UserDocument } from '../models/user.schema';
import UserProfile, { UserProfileDocument } from '../models/userProfile.schema';
import { toHandleName } from '../utils/convertString';
import jobTitleService from './jobTitle.service';
import mediaService from './media.service';
class UserService {
    async getMe(userId: string) {
        const user = await this.findUserById(userId);
        await user.populate('avatar');

        const userProfile = await this.findUserProfileById(userId);

        await userProfile.populate('friends followers followings coverPage');
        const dto = {
            ...user.toObject(),
            ...userProfile.toObject(),
        };
        return new UserProfileDTO(dto).toPublish();
    }

    async getUserById(id: string) {
        const user = await this.findUserById(id);
        const userProfile = await UserProfile.findOne({ userId: user.id });
        if (!userProfile) {
            throw ApiError.notFound('User profile not found');
        }

        await userProfile.populate('friends');
        const dto = {
            ...user.toObject(),
            ...userProfile.toObject(),
        } as UserProfileDocument & UserDocument;

        return new UserProfileDTO(dto).toPublish();
    }

    async searchUser({
        query,
        userId,
        page,
        limit,
    }: {
        query: string;
        userId?: string;
        page: number;
        limit: number;
    }) {
        const users = (await User.find({
            $or: [
                { firstName: { $regex: query, $options: 'i' } },
                { lastName: { $regex: query, $options: 'i' } },
                { handle: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
                { phone: { $regex: query, $options: 'i' } },
                { bio: { $regex: query, $options: 'i' } },
                { jobTitle: { $regex: query, $options: 'i' } },
            ],
        })
            .limit(limit)
            .skip((page - 1) * limit)) as UserDocument[];

        await Promise.all(users.map(async (user) => user.populate('avatar')));

        return users.map((_user) => new UserDTO(_user).toResponse());
    }

    async updateUser(id: string, payload: UpdateUserServiceInput) {
        const user = await this.findUserById(id);
        const userProfile = await this.findUserProfileById(id);

        if (payload.firstName) {
            user.firstName = payload.firstName;
        }

        if (payload.lastName) {
            user.lastName = payload.lastName;
        }

        if (payload.handle) {
            const handleName = toHandleName(payload.handle);
            const isExitHandle = await User.findOne({ handle: handleName });
            if (isExitHandle) {
                throw ApiError.conflict(
                    `Handle name ${handleName} already exists`
                );
            }
            user.handle = handleName;
        }

        if (payload.phone) {
            userProfile.phone = payload.phone;
        }

        if (payload.bio) {
            userProfile.bio = payload.bio;
        }

        if (payload.jobTitle) {
            const jobTitle = await jobTitleService.findJobTitleById(
                payload.jobTitle
            );
            userProfile.jobTitle = jobTitle.id;
        }

        if (payload.socials) {
            userProfile.set('socials', payload.socials);
        }

        if (payload.links) {
            userProfile.set('links', payload.links);
        }

        if (payload.skills) {
            userProfile.set('skills', payload.skills);
        }

        if (payload.projects) {
            userProfile.set('projects', payload.projects);
        }

        if (payload.avatar) {
            if (payload.avatar.type === 'video') {
                throw ApiError.badRequest('video is not supported for avatar!');
            }
            const payloadMedia: UpdateMediaInput = {
                ...payload.avatar,
                file: payload.avatar.fileName,
            };

            if (!user.avatar) {
                const media = await mediaService.create(payloadMedia);
                user.avatar = media.id;
            } else {
                await mediaService.updateMedia(
                    user.avatar.toString(),
                    payloadMedia
                );
            }
        }

        if (payload.coverPage) {
            if (payload.coverPage.type === 'video') {
                throw ApiError.badRequest(
                    'video is not supported for coverPage!'
                );
            }

            const payloadMedia: UpdateMediaInput = {
                ...payload.coverPage,
                file: payload.coverPage.fileName,
            };

            if (!userProfile.coverPage) {
                const media = await mediaService.create(payloadMedia);
                userProfile.coverPage = media.id;
            } else {
                await mediaService.updateMedia(
                    userProfile.coverPage.toString(),
                    payloadMedia
                );
            }
        }

        await user.save();

        await userProfile.save();
        // await Promise.all([user.save(), userProfile.save()]);

        await user.populate('avatar');
        await userProfile.populate('coverPage friends followers followings');

        const dto = {
            ...user.toObject(),
            ...userProfile.toObject(),
        } as UserProfileDocument & UserDocument;

        return new UserProfileDTO(dto).toPublish();
    }

    async addFriend(userId: string, friendId: string) {
        const user = await this.findUserById(userId);
        const friend = await this.findUserById(friendId);

        const userProfile = await this.findUserProfileById(userId);

        if (userProfile.friends.includes(friend.id)) {
            throw ApiError.conflict('You are already friends');
        } else {
            userProfile.friends.push(friend.id);
            user.friendCount = userProfile.friends.length;
            await user.save();
            await userProfile.save();
        }
        return userProfile;
    }

    async removeFriend(userId: string, friendId: string) {
        const user = await this.findUserById(userId);
        const friend = await this.findUserById(friendId);
        const userProfile = await this.findUserProfileById(userId);

        if (userProfile.friends.includes(friend.id)) {
            userProfile.friends = userProfile.friends.filter(
                (id) => id.toString() !== friend.id
            );
            user.friendCount = userProfile.friends.length;
            await user.save();
            await userProfile.save();
        } else {
            throw ApiError.conflict('You are not friends');
        }
        return userProfile;
    }

    async addFollower(userId: string, followerId: string) {
        const userProfile = await this.findUserProfileById(userId);
        const followerProfile = await this.findUserProfileById(followerId);

        if (userProfile.followers.includes(followerProfile.userId)) {
            throw ApiError.conflict('You are already following this user');
        }

        userProfile.followers.push(followerProfile.userId);
        followerProfile.followings.push(userProfile.userId);

        const user = await this.findUserById(userId);
        user.followerCount = userProfile.followers.length;
        const follower = await this.findUserById(followerId);
        follower.followingCount = followerProfile.followings.length;

        await user.save();
        await follower.save();
        await userProfile.save();
        await followerProfile.save();
    }

    async removeFollower(userId: string, followerId: string) {
        const userProfile = await this.findUserProfileById(userId);
        const followerProfile = await this.findUserProfileById(followerId);

        if (!userProfile.followers.includes(followerProfile.userId)) {
            throw ApiError.conflict('You are not following this user');
        }
        userProfile.followers = userProfile.followers.filter(
            (id) => id.toString() !== followerProfile.userId.toString()
        );
        followerProfile.followings = followerProfile.followings.filter(
            (id) => id.toString() !== userProfile.userId.toString()
        );

        const user = await this.findUserById(userId);
        user.followerCount = userProfile.followers.length;
        const follower = await this.findUserById(followerId);
        follower.followingCount = userProfile.followings.length;

        await user.save();
        await follower.save();
        await userProfile.save();
        await followerProfile.save();
    }
    async findUserById(id: string) {
        const user = await User.findById(id);
        if (!user) {
            throw ApiError.notFound('User not found by id, ' + id);
        }
        return user as UserDocument;
    }

    async findUserProfileById(id: string) {
        const userProfile = await UserProfile.findOne({ userId: id });
        if (!userProfile) {
            throw ApiError.notFound('User profile not found');
        }

        return userProfile;
    }
}

export default new UserService();
