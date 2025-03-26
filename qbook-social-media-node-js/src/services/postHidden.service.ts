import ApiError from '../core/ApiError';
import postSchema from '../models/post.schema';
import postHiddenSchema from '../models/postHidden.schema';
import userSchema from '../models/user.schema';

class PostHiddenService {
    async hiddenPost(userId: string, postId: string) {
        const user = await userSchema.findById(userId);
        const post = await postSchema.findById(postId);

        if (!user) {
            throw ApiError.notFound('user not found!');
        }

        if (!post) {
            throw ApiError.notFound('post not found!');
        }

        const findHidden = await postHiddenSchema.find({ userId, postId });

        if (findHidden.length > 0) {
            throw ApiError.conflict('post have been hidden');
        }

        const hidden = await postHiddenSchema.create({ userId, postId });

        return hidden;
    }
}

export default new PostHiddenService();
