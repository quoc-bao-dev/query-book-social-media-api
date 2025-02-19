import { UserDTO } from '../DTO/user.dto';
import Follower from '../models/follower.schema';
import { followSocket } from '../socket/follow';
import notificationService from './notification.service';
import userService from './user.service';

class FollowService {
    async getFollowers(userId: string) {
        const followers = await Follower.find({ userId });

        const users = await Promise.all(
            followers.map((follower) =>
                userService.findUserById(follower.followerId.toString())
            )
        );

        return users.map((user) => new UserDTO(user).toResponse());
    }
    async follow(userId: string, followingId: string) {
        await userService.addFollower(followingId, userId);
        //TODO: [notification]: send for follower

        Follower.create({
            userId,
            followerId: followingId,
        });

        const user = await userService.findUserById(userId);
        followSocket(followingId).follow(user);

        await notificationService.create({
            type: 'relationship',
            relationType: 'follow',
            senderId: userId,
            targetId: followingId,
        });
        return {
            message: 'Follow this user successful!',
        };
    }

    async unFollow(userId: string, followingId: string) {
        await userService.removeFollower(followingId, userId);
        await Follower.findOneAndDelete({
            userId,
            followerId: followingId,
        });
        return {
            message: 'Unfollow this user successful!',
        };
    }
}

export default new FollowService();
