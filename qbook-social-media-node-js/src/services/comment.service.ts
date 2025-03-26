import ApiError from '../core/ApiError';
import MediaDTO from '../DTO/media.dto';
import Comment from '../models/comment.schema';
import { MediaDocument } from '../models/media.schema';
import {
    CommentResult,
    CreateCommentPostInput,
    CreateCommentRelyInput,
    CreateCommentServiceInput,
} from '../models/types/comment.type';
import { MediaType } from '../models/types/media.type';
import { UserDocument } from '../models/user.schema';
import likeService from './like.service';
import mediaService from './media.service';
import postService from './post.service';
import userService from './user.service';

class CommentService {
    async getCommentsByPostId(postId: string) {
        const populate = [
            {
                path: 'userId',
                select: 'id firstName lastName avatar',
                populate: {
                    path: 'avatar',
                    select: 'id url file type sourceType',
                },
            },
            {
                path: 'media',
                select: 'id url file type sourceType',
            },
            {
                path: 'replies',
                populate: {
                    path: 'userId',
                    select: 'id firstName lastName avatar',
                },
            },
        ];
        const comments = await Comment.find({
            postId,
            isReply: false,
        }).populate([
            {
                path: 'userId',
                select: 'id firstName lastName avatar',
                populate: {
                    path: 'avatar',
                    select: 'id url file type sourceType',
                },
            },
            {
                path: 'media',
                select: 'id url file type sourceType',
            },
            {
                path: 'replies',
                populate: populate,
            },
        ]);

        return comments.map((comment) =>
            this.toResponse(comment as CommentResult)
        );
    }

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
            postId: commentInDB.postId,
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
            comment.userId.toString() !== userId &&
            post.userId.toString() !== userId
        ) {
            throw ApiError.forbidden(
                'You are not allowed to delete this comment'
            );
        }

        if (comment.media?.toString()) {
            await mediaService.deleteMedia(comment.media?.toString()!);
        }
        await likeService.deleteLikeOfComment(commentId);

        if (comment.replies.length > 0) {
            for (const reply of comment.replies) {
                await this.deleteCommentReply(reply.toString());
            }
        }

        if (comment.isReply) {
            const parentComment = await Comment.findById(comment.parent);
            if (!parentComment) return;
            parentComment.replies = parentComment?.replies.filter(
                (i) => i.toString() !== comment.id.toString()
            );
            await parentComment.save();
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
        if (comment.media)
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

    toResponse(payload: CommentResult) {
        const user = payload.userId as UserDocument;
        return {
            id: payload._id,
            content: payload.content,
            author: {
                id: user._id,
                fullName: `${user.firstName} ${user.lastName}`,
                avatar: user.avatar,
                avatarUrl:
                    user.avatar &&
                    new MediaDTO(user.avatar as MediaDocument).toUrl(),
            },
            media: payload.media && {
                id: payload.media._id,
                url: payload.media.url,
                file: payload.media.file,
                type: payload.media.type,
                sourceType: payload.media.sourceType,
            },
            mediaUrl:
                payload.media &&
                new MediaDTO(payload.media as MediaDocument).toUrl(),
            likes: payload.likes,
            isReply: payload.isReply,
            replies: (payload.replies as CommentResult[]).map((reply) =>
                this.toResponse(reply)
            ),
        };
    }
}

export default new CommentService();
