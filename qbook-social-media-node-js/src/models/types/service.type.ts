import { StoryDocument } from '../story.schema';
import { MediaType } from './media.type';

export type CreateStoryBody = {
    content: string;
    media: {
        fileName?: string;
        url?: string;
        type: MediaType;
        sourceType: string;
    };
};

export type CreateStoryServiceInput = CreateStoryBody & {
    userId: string;
};

export type CreateStoryInput = Pick<
    StoryDocument,
    'userId' | 'content' | 'media' | 'expireAt'
>;
