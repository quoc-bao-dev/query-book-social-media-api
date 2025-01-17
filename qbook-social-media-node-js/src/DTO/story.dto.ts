import { ObjectId } from 'mongoose';
import { MediaDocument } from '../models/media.schema';
import { StoryDocument } from '../models/story.schema';
import { UserDocument } from '../models/user.schema';
import { create } from 'lodash';

class StoryDTO {
    userId: ObjectId | UserDocument;
    content: string;
    media: string | MediaDocument;
    status: 'public' | 'private' | 'hidden' | 'friend';
    viewer: ObjectId[] | UserDocument[];
    expireAt: Date;
    createdAt: Date;
    constructor(payload: StoryDocument) {
        this.userId = payload.userId;
        this.content = payload.content;
        this.media = payload.media;
        this.status = payload.status;
        this.viewer = payload.viewer;
        this.expireAt = payload.expireAt;
        this.createdAt = payload.createdAt;
    }

    toResponse() {
        const user = this.userId as UserDocument;
        const media = this.media as MediaDocument;
        const viewer = (this.viewer as UserDocument[]).map((item) => ({
            id: item.id,
            name: item.username,
            avatar: item.avatar,
        }));
        return {
            author: {
                id: user.id,
                name: user.username,
                avatar: user.avatar,
            },
            content: this.content,
            media: {
                url: media.url,
                file: media.file,
                type: media.type,
                sourceType: media.sourceType,
            },
            status: this.status,
            viewer: viewer,
            createdAt: this.createdAt,
        };
    }
}

export default StoryDTO;
