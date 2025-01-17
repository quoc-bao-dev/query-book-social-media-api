import { Request, Response } from 'express';
import { createResponse } from '../core';
import commentService from '../services/comment.service';
import { update } from 'lodash';
const commentController = {
    async replyComment(req: Request, res: Response) {
        const { id } = req.params;
        const { content, media } = req.body;
        const userId = req.userId!;

        const comment = await commentService.replyComment({
            userId,
            parent: id,
            content,
            media,
        });

        const response = createResponse({
            status: 200,
            message: 'Reply comment successful',
            data: comment,
        });
        res.status(response.status).json(response);
    },

    async likeComment(req: Request, res: Response) {
        const { id } = req.params;
        const userId = req.userId!;

        const isLiked = await commentService.likeComment(userId, id);

        const response = createResponse({
            status: 200,
            message: isLiked
                ? 'Dislike comment successful'
                : 'Like comment successful',
        });

        res.status(response.status).json(response);
    },

    async updateComment(req: Request, res: Response) {
        const { id } = req.params;
        const { content } = req.body;
        const userId = req.userId!;

        const comment = await commentService.updateComment({
            userId,
            commentId: id,
            content,
        });

        const response = createResponse({
            status: 200,
            message: 'Update comment successful',
            data: comment,
        });
        res.status(response.status).json(response);
    },

    async deleteComment(req: Request, res: Response) {
        const { id } = req.params;
        const userId = req.userId!;

        await commentService.deleteComment(userId, id);

        const response = createResponse({
            status: 200,
            message: 'Delete comment successful',
        });
        res.status(response.status).json(response);
    },
};

export default commentController;
