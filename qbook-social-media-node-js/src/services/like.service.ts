import Like from '../models/like.schema';
import commentService from './comment.service';
import postService from './post.service';

class LikeService {
    async likePost(postId: string, userId: string) {
        const post = await postService.findPostById(postId);

        const likeInDB = await Like.findOne({
            userId,
            postId,
        });

        const isLiked = !!likeInDB;

        if (isLiked) {
            await Like.findByIdAndDelete(likeInDB.id);
            post.interestScore -= 1;
            post.likes.filter((item) => item.toString() !== likeInDB?.id);
        }

        if (!isLiked) {
            const like = new Like({
                userId,
                postId,
                type: 'post',
            });
            post.interestScore += 1;
            await like.save();
            post.likes.push(like.id);
        }

        await post.save();

        return isLiked;
    }

    async likeComment(commentId: string, userId: string) {
        const comment = await commentService.findCommentById(commentId);

        const likeInDB = await Like.findOne({
            userId,
            commentId,
        });

        const isLiked = !!likeInDB;

        if (isLiked) {
            await Like.findByIdAndDelete(likeInDB.id);
            comment.likes.filter((item) => item.toString() !== likeInDB?.id);
        }

        if (!isLiked) {
            const like = new Like({
                userId,
                commentId,
                type: 'comment',
            });
            await like.save();
            comment.likes.push(like.id);
        }

        await comment.save();

        return isLiked;
    }

    async deleteLikeOfComment(commentId: string) {
        await Like.findByIdAndDelete({
            type: 'comment',
            commentId,
        });
    }
}

export default new LikeService();
