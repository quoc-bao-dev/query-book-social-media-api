import { ObjectId } from 'mongoose';
import { MediaDocument } from '../models/media.schema';

class MediaDTO {
    id: string;
    userId?: ObjectId | string;
    type: string;
    url?: string;
    file?: string;
    sourceType: string;
    constructor(payload: MediaDocument) {
        this.id = payload.id;
        this.userId = payload.userId;
        this.type = payload.type;
        this.url = payload.url;
        this.file = payload.file;
        this.sourceType = payload.sourceType;
    }

    toResponse() {
        return {
            id: this.id,
            userId: this.userId,
            type: this.type,
            sourceType: this.sourceType,
            url: this.sourceType === 'url' ? this.url : undefined,
            file: this.sourceType === 'file' ? this.file : undefined,
        };
    }
}

export default MediaDTO;
