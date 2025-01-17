import ApiError from '../core/ApiError';
import userService from './user.service';

import PendingRequest from '../models/pendingRequest.schema';

class PendingRequestService {
    async getPendingRequests(userId: string) {
        const requests = await PendingRequest.find({
            receiverId: userId,
            status: 'pending',
        });
        return requests;
    }
    async createRequest(userId: string, targetId: string) {
        const user = await userService.findUserById(userId);

        const targetUser = await userService.findUserById(targetId);

        const pendingRequest = await PendingRequest.findOne({
            $or: [
                {
                    senderId: user.id,
                    receiverId: targetUser.id,
                },
                {
                    senderId: targetUser.id,
                    receiverId: user.id,
                },
            ],
        });

        if (pendingRequest) {
            if (pendingRequest.status === 'pending') {
                throw ApiError.conflict('Pending request already exists');
            }
            pendingRequest.status = 'pending';
            await pendingRequest.save();
            return pendingRequest;
        }

        const newPendingRequest = await PendingRequest.create({
            senderId: user.id,
            receiverId: targetUser.id,
            requestType: 'friend',
            status: 'pending',
        });

        return newPendingRequest;
    }

    async removeRequest(userId: string, targetId: string) {
        const user = await userService.findUserById(userId);
        const targetUser = await userService.findUserById(targetId);
        const pendingRequest = await PendingRequest.findOne({
            $or: [
                {
                    senderId: user.id,
                    receiverId: targetUser.id,
                },
                {
                    senderId: targetUser.id,
                    receiverId: user.id,
                },
            ],
        });

        await pendingRequest?.deleteOne();

        if (!pendingRequest) {
            throw ApiError.notFound('You are not friends');
        }

        return pendingRequest;
    }

    async acceptRequest(userId: string, senderId: string) {
        const user = await userService.findUserById(userId);

        const senderUser = await userService.findUserById(senderId);

        const pendingRequest = await PendingRequest.findOne({
            senderId: senderUser.id,
            receiverId: user.id,
            status: 'pending',
        });

        if (!pendingRequest) {
            throw ApiError.notFound('Pending request not found');
        }
        pendingRequest.status = 'accepted';
        await pendingRequest.save();
        return pendingRequest;
    }

    async rejectRequest(userId: string, senderId: string) {
        const user = await userService.findUserById(userId);

        const senderUser = await userService.findUserById(senderId);

        const pendingRequest = await PendingRequest.findOne({
            senderId: senderUser.id,
            receiverId: user.id,
            status: 'pending',
        });

        if (!pendingRequest) {
            throw ApiError.notFound('Pending request not found');
        }
        pendingRequest.status = 'rejected';
        await pendingRequest.save();
        return pendingRequest;
    }
}

export default new PendingRequestService();
