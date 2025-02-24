import MediaDTO from '../DTO/media.dto';
import notificationSchema from '../models/notification.schema';
import userService from './user.service';

class NotificationService {
    private userOption = [
        {
            path: 'senderId',
            select: 'firstName lastName email handle professional accountType _id avatar',
            populate: {
                path: 'avatar',
            },
        },
        {
            path: 'targetId',
            select: 'firstName lastName email handle professional accountType _id avatar',
            populate: {
                path: 'avatar',
            },
        },
    ];
    async getByUserId(userId: string) {
        const notifies = await notificationSchema
            .find({
                recipients: { $elemMatch: { userId } },
            })
            .populate(this.userOption);

        const notifyObj = notifies.map((doc) => doc.toObject());

        const result = notifyObj.map((_item) => ({
            ..._item,
            senderId: _item.senderId
                ? {
                      ..._item?.senderId,
                      avatarUrl: _item?.senderId?.avatar
                          ? new MediaDTO(_item.senderId.avatar).toUrl()
                          : null,
                  }
                : null,
            targetId: _item.targetId
                ? {
                      ..._item?.targetId,
                      avatarUrl: _item?.targetId?.avatar
                          ? new MediaDTO(_item.targetId.avatar).toUrl()
                          : null,
                  }
                : null,
        }));

        return result;
    }
    async create(payload: any) {
        const type = payload.type;
        if (type === 'relationship') {
            const relationType = payload.relationType;

            if (relationType === 'accept_request') {
                const notify = await this.createAcceptNotify(payload);
                return notify;
            }

            if (relationType === 'follow') {
                const notify = await this.createFollowNotify(payload);
                return notify;
            }
        }
    }

    private async createAcceptNotify(payload: any) {
        const { senderId, targetId } = payload;

        const targetUser = await userService.findUserById(targetId);

        const message = `${targetUser.firstName} ${targetUser.lastName} has been accept our request`;

        const recipients = [{ userId: senderId, isRead: false }];

        const payloadInput = {
            type: 'relationship',
            relationType: 'accept_request',
            senderId,
            targetId,
            recipients,
            message,
        };

        const notify = await notificationSchema.create(payloadInput);

        return notify;
    }

    private async createFollowNotify(payload: any) {
        const { senderId, targetId } = payload;

        const sender = await userService.findUserById(senderId);

        const message = `${sender.firstName} ${sender.lastName} has been follow you`;

        const recipients = [{ userId: targetId, isRead: false }];

        const payloadInput = {
            type: 'relationship',
            relationType: 'follow',
            senderId,
            targetId,
            recipients,
            message,
        };

        const notify = await notificationSchema.create(payloadInput);

        return notify;
    }
}

export default new NotificationService();
