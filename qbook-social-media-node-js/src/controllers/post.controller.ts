import { Request, Response } from 'express';
import { createPaginationResponse, createResponse } from '../core';
import ApiError from '../core/ApiError';
import { CreateCommentBody } from '../models/types/comment.type';
import { CreatePostBody, UpdatePostBody } from '../models/types/post.type';
import commentService from '../services/comment.service';
import likeService from '../services/like.service';
import postService from '../services/post.service';

const PostController = {
    async create(req: Request, res: Response) {
        const { content, hashTags, status, media }: CreatePostBody = req.body;

        const userId = req.userId;

        if (!userId) {
            throw ApiError.unauthorized('User is not authenticated');
        }

        const post = await postService.create({
            userId,
            content,
            hashTags,
            status,
            media,
        });

        const response = createResponse({
            status: 200,
            message: 'Create post successful',
            data: post,
        });

        res.status(response.status).json(response);
    },

    async getPosts(req: Request, res: Response) {
        const posts = await postService.getPosts({
            userId: req.userId,
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
        });
        const response = createPaginationResponse({
            status: 200,
            message: 'Get post successful',
            pagination: posts.pagination,
            data: posts.data,
        });

        res.status(response.status).json(response);
    },

    async getPostById(req: Request, res: Response) {
        const { id } = req.params;
        const post = await postService.getPostById(id);
        const response = createResponse({
            status: 200,
            message: 'Get post successful',
            data: post,
        });
        res.status(response.status).json(response);
    },

    async getPostByUserId(req: Request, res: Response) {
        const curUerId = req.userId;
        const { userId } = req.params;
        const posts = await postService.getPostByUserId(userId, curUerId);
        const response = createResponse({
            message: 'get post successful',
            status: 200,
            data: posts,
        });
        res.status(response.status).json(response);
    },

    async updatePost(req: Request, res: Response) {
        const { id } = req.params;
        const { content, hashTags, status, media }: UpdatePostBody = req.body;

        const post = await postService.updatePost(id, req.userId!, {
            media,
            content,
            hashTags,
            status,
        });

        const response = createResponse({
            status: 200,
            message: 'Update post successful',
            data: post,
        });
        res.status(response.status).json(response);
    },

    async deletePost(req: Request, res: Response) {
        const { id } = req.params;
        const userId = req.userId!;

        await postService.deletePost(id, userId);

        const response = createResponse({
            status: 200,
            message: 'Delete post successful',
        });
        res.status(response.status).json(response);
    },

    async likePost(req: Request, res: Response) {
        const { id } = req.params;
        const userId = req.userId!;

        const { isLiked, postResult } = await likeService.likePost(id, userId);

        const response = createResponse({
            status: 200,
            message: isLiked
                ? 'Dislike post successful'
                : 'Like post successful',
            data: postResult,
        });
        res.status(response.status).json(response);
    },

    async commentPost(req: Request, res: Response) {
        const { id } = req.params;
        const { content, media }: CreateCommentBody = req.body;
        const userId = req.userId!;

        const comment = await commentService.commentPost({
            userId,
            postId: id,
            content,
            media,
        });

        const response = createResponse({
            status: 200,
            message: 'Comment post successful',
            data: comment,
        });
        res.status(response.status).json(response);
    },
};

export default PostController;
