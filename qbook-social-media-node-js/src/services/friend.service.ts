import ApiError from '../core/ApiError';
import { UserDTO } from '../DTO/user.dto';
import Friend from '../models/friend.schema';
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
            lsFriends.map((id) => userService.findUserById(id))
        );

        return users.map((user) => new UserDTO(user).toResponse());
    }

    async getPendingRequests(userId: string) {
        const requests = await pendingRequestService.getPendingRequests(userId);

        const lsUserRequests = await Promise.all(
            requests.map((request) =>
                userService.findUserById(request.senderId.toString())
            )
        );
        return lsUserRequests.map((user) => new UserDTO(user).toUserRequest());
    }
    async sendRequest(userId: string, targetId: string) {
        const request = await pendingRequestService.createRequest(
            userId,
            targetId
        );
        if (!request) {
            throw ApiError.conflict('Pending request already exists');
        }
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
}

export default new FriendService();
