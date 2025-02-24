import ApiError from '../core/ApiError';
import Comment from '../models/comment.schema';
import { MediaDocument } from '../models/media.schema';
import {
    CreateCommentPostInput,
    CreateCommentRelyInput,
    CreateCommentServiceInput,
} from '../models/types/comment.type';
import { MediaType } from '../models/types/media.type';
import likeService from './like.service';
import mediaService from './media.service';
import postService from './post.service';
import userService from './user.service';

class CommentService {
    async commentPost(payload: CreateCommentServiceInput) {
        const userInDB = await userService.findUserById(payload.userId);
        const postInDB = await postService.findPostById(payload.postId!);

        let media: MediaDocument | undefined = undefined;
        if (payload.media) {
            media = await mediaService.create({
                userId: userInDB.id,
                url: payload.media.url,
                file: payload.media.fileName,
                type: payload.media.type as MediaType,
                sourceType: payload.media.sourceType,
            });
        }

        const commentPayload: CreateCommentPostInput = {
            userId: userInDB.id,
            postId: postInDB.id,
            content: payload.content,
            media,
            isReply: false,
        };
        const comment = await Comment.create(commentPayload);
        postInDB.comments.push(comment.id);
        postInDB.interestScore += 3;
        await postInDB.save();
        return comment;
    }

    async replyComment(payload: CreateCommentServiceInput) {
        const userInDB = await userService.findUserById(payload.userId);
        const commentInDB = await this.findCommentById(payload.parent);

        let media: MediaDocument | undefined = undefined;
        if (payload.media) {
            media = await mediaService.create({
                userId: userInDB.id,
                url: payload.media.url,
                file: payload.media.fileName,
                type: payload.media.type as MediaType,
                sourceType: payload.media.sourceType,
            });
        }

        const commentPayload: CreateCommentRelyInput = {
            userId: userInDB.id,
            parent: commentInDB.id,
            content: payload.content,
            isReply: true,
            media,
        };

        const comment = await Comment.create(commentPayload);

        commentInDB.replies.push(comment.id);

        await commentInDB.save();

        return comment;
    }

    async likeComment(userId: string, commentId: string) {
        const isLiked = await likeService.likeComment(commentId, userId);
        return isLiked;
    }

    async deleteComment(commentId: string, userId: string) {
        const comment = await this.findCommentById(commentId);
        const post = await postService.findPostById(comment.postId.toString());
        if (
            comment.userId.toString() !== userId ||
            post.userId.toString() !== userId
        ) {
            throw ApiError.forbidden(
                'You are not allowed to delete this comment'
            );
        }
        await mediaService.deleteMedia(comment.media?.toString()!);
        await likeService.deleteLikeOfComment(commentId);
        if (comment.replies.length > 0) {
            for (const reply of comment.replies) {
                await this.deleteCommentReply(reply.toString());
            }
        }
        await comment.deleteOne();
    }

    async updateComment({
        commentId,
        userId,
        content,
    }: {
        userId: string;
        commentId: string;
        content: string;
    }) {
        const user = await userService.findUserById(userId);
        const comment = await this.findCommentById(commentId);

        if (comment.userId.toString() !== user.id) {
            throw ApiError.forbidden(
                'You are not allowed to update this comment'
            );
        }

        comment.content = content;
        await comment.save();
        return comment;
    }

    async deleteCommentReply(commentId: string) {
        const comment = await this.findCommentById(commentId);
        await likeService.deleteLikeOfComment(commentId);
        await mediaService.deleteMedia(comment.media?.toString()!);
        if (comment.replies.length > 0) {
            for (const reply of comment.replies) {
                await this.deleteCommentReply(reply.toString());
            }
        }
        await comment.deleteOne();
    }

    async findCommentById(id?: string) {
        if (!id) {
            throw ApiError.notFound('Not found comment to reply!');
        }
        const comment = await Comment.findById(id);
        if (!comment) {
            throw ApiError.notFound('Not found comment to reply!');
        }
        return comment;
    }
}

export default new CommentService();
