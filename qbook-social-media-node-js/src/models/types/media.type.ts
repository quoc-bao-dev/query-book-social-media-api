import { MediaDocument } from '../media.schema';

export type MediaType = 'image' | 'video';
export type CreateMediaBody = {
    type: MediaType;
    sourceType: 'url' | 'file';
    url?: string;
    fileName?: string;
};

export type CreateMediaInput = Pick<
    MediaDocument,
    'url' | 'type' | 'userId' | 'sourceType' | 'file'
>;

export type UpdateMediaInput = CreateMediaInput;
