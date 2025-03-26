import ApiError from '../core/ApiError';
import { UserDTO } from '../DTO/user.dto';
import Friend from '../models/friend.schema';
import pendingRequestSchema from '../models/pendingRequest.schema';
import { UserDocument } from '../models/user.schema';
import { friendSocket } from '../socket/friend';
import notificationService from './notification.service';
import pendingRequestService from './pendingRequest.service';
import userService from './user.service';
class FriendService {
    async getFriends(userId: string) {
        const friends = await Friend.find({
            users: { $elemMatch: { $eq: userId } },
        });

        const lsFriends = [];
        for (let i = 0; i < friends.length; i++) {
            if (friends[i].users[0].toString() === userId) {
                lsFriends.push(friends[i].users[1].toString());
            } else {
                lsFriends.push(friends[i].users[0].toString());
            }
        }

        const users = await Promise.all(
            lsFriends.map((id) => userService.getFriendById(id))
        );

        return users.map((user) => new UserDTO(user).toResponse());
    }

    async getPendingRequests(userId: string) {
        const lsRequest = await pendingRequestSchema
            .find({
                receiverId: userId,
                status: 'pending',
            })
            .populate({
                path: 'senderId',
                populate: { path: 'avatar' },
            });

        const lsUserRequests = lsRequest.map<UserDocument>(
            (request) => request.senderId as UserDocument
        );

        return lsUserRequests.map((user: UserDocument, index) => ({
            ...new UserDTO(user).toUserRequest(),
            createdAt: lsRequest[index].createdAt,
        }));
    }
    async getSendRequests(userId: string) {
        console.log(userId);

        const lsRequest = await pendingRequestSchema
            .find({
                senderId: userId,
                status: 'pending',
            })
            .populate({
                path: 'receiverId',
                populate: { path: 'avatar' },
            });

        const lsUserRequests = lsRequest.map<UserDocument>(
            (request) => request.receiverId as UserDocument
        );

        return lsUserRequests.map((user: UserDocument, index) => ({
            ...new UserDTO(user).toUserRequest(),
            createdAt: lsRequest[index].createdAt,
        }));
    }
    async sendRequest(userId: string, targetId: string) {
        const request = await pendingRequestService.createRequest(
            userId,
            targetId
        );

        if (!request) {
            throw ApiError.conflict('Pending request already exists');
        }

        const targetUser = await userService.findUserById(targetId);

        friendSocket(targetId).sendRequest(targetUser);

        return request;
    }

    async acceptRequest(userId: string, senderId: string) {
        if (userId === senderId) {
            throw ApiError.badRequest('You cannot add yourself as a friend');
        }

        const isFriend = await Friend.findOne({
            $or: [
                {
                    users: [userId, senderId],
                },
                {
                    users: [senderId, userId],
                },
            ],
        });

        if (isFriend) {
            throw ApiError.conflict('You are already friends');
        }

        const request = await pendingRequestService.acceptRequest(
            userId,
            senderId
        );

        if (!request) {
            throw ApiError.notFound('Pending request not found');
        }

        const relation = await Friend.create({
            users: [userId, senderId],
        });

        await userService.addFriend(userId, senderId);
        await userService.addFriend(senderId, userId);

        const targetUser = await userService.findUserById(userId);

        await notificationService.create({
            type: 'relationship',
            relationType: 'accept_request',
            senderId,
            targetId: userId,
        });

        friendSocket(senderId).acceptRequest(targetUser);

        return relation;
    }

    async rejectRequest(userId: string, senderId: string) {
        const request = await pendingRequestService.rejectRequest(
            userId,
            senderId
        );

        if (!request) {
            throw ApiError.notFound('Pending request not found');
        }

        return request;
    }

    async removeFriend(userId: string, friendId: string) {
        await userService.removeFriend(userId, friendId);
        await userService.removeFriend(friendId, userId);
        //TODO: remove pending request
        await pendingRequestService.removeRequest(userId, friendId);

        await Friend.findOneAndDelete({
            $or: [
                {
                    users: [userId, friendId],
                },
                {
                    users: [friendId, userId],
                },
            ],
        });
        return true;
    }

    async cancelRequest(userId: string, receiverId: string) {
        const request = await pendingRequestService.cancelRequest(
            userId,
            receiverId
        );

        if (!request) {
            throw ApiError.notFound('Pending request not found');
        }

        return request;
    }
}

export default new FriendService();
