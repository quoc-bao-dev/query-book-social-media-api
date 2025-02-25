import { PostDocument } from '../post.schema';
import { CreateMediaInput, MediaType } from './media.type';
import { PostStatusType } from './type';

export type CreatePostBody = {
    content: string;
    hashTags: string[];
    status: PostStatusType;
    media: {
        fileName?: string;
        url?: string;
        type: MediaType;
        sourceType: string;
    }[];
};

export type CreatePostServiceInput = CreatePostBody & {
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export type CreatePostInput = Pick<
    PostDocument,
    'userId' | 'content' | 'status' | 'hashTags'
> & {
    media: CreateMediaInput[];
    createdAt?: Date;
    updatedAt?: Date;
};

export type UpdatePostBody = {
    content: string;
    hashTags: string[];
    status: PostStatusType;
    media: {
        id: string;
        action: 'add' | 'remove';
        fileName?: string;
        url?: string;
        type: MediaType;
        sourceType: string;
    }[];
};

export type UpdatePostInput = Partial<
    Omit<
        CreatePostInput,
        | 'userId'
        | 'likes'
        | 'comments'
        | 'view'
        | 'interestScore'
        | 'isBlocked'
        | 'media'
    >
> & {
    media?: {
        id: string;
        action: 'add' | 'remove';
        fileName?: string;
        url?: string;
        type: MediaType;
        sourceType: string;
    }[];
};
