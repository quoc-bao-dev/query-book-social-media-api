import { ObjectId } from 'mongoose';
import { CommentDocument } from '../comment.schema';
import { MediaDocument } from '../media.schema';

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
    'userId' | 'postId' | 'content' | 'parent' | 'isReply' | 'media'
>;
export type CreateCommentPostInput = Pick<
    CommentDocument,
    'userId' | 'postId' | 'content' | 'isReply' | 'media'
>;

export interface CommentResult {
    _id: string | ObjectId;
    userId: UserId | ObjectId;
    postId: string | ObjectId;
    content: string;
    likes?: any[];
    isReply: boolean;
    replies: CommentResult[];
    media: MediaDocument;
    createdAt: string;
    updatedAt: string;
    __v?: number;
}

export interface UserId {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: MediaDocument;
}

export interface Avatar {
    _id: string;
    sourceType: string;
    type: string;
    url?: string;
    file?: string;
}
