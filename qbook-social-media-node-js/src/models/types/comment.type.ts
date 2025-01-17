import { CommentDocument } from '../comment.schema';

export type CreateCommentBody = {
    postId?: string;
    content: string;
    parent?: string;
    isReply?: boolean;
    media?: {
        fileName?: string;
        url?: string;
        type: string;
        sourceType: string;
    };
};

export type CreateCommentServiceInput = CreateCommentBody & {
    userId: string;
};

export type CreateCommentRelyInput = Pick<
    CommentDocument,
    'userId' | 'content' | 'parent' | 'isReply' | 'media'
>;
export type CreateCommentPostInput = Pick<
    CommentDocument,
    'userId' | 'postId' | 'content' | 'isReply' | 'media'
>;
