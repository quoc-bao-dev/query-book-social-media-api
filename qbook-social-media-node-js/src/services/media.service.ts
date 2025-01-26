import { CreateMediaInput, UpdateMediaInput } from '../models/types/media.type';
import Media, { MediaDocument } from '../models/media.schema';
import ApiError from '../core/ApiError';
class MediaService {
    async create(payload: CreateMediaInput) {
        if (payload.sourceType === 'file' && !payload.file) {
            throw ApiError.badRequest(
                '[media]: File name is required, if source type is file'
            );
        }

        if (payload.sourceType === 'url' && !payload.url) {
            throw ApiError.badRequest(
                '[media]: Url is required, if source type is url'
            );
        }

        const media = await Media.create(payload);
        return media;
    }

    async updateMedia(id: string, payload: UpdateMediaInput) {
        if (payload.sourceType === 'file' && !payload.file) {
            throw ApiError.badRequest(
                '[media]: File name is required, if source type is file'
            );
        }

        if (payload.sourceType === 'url' && !payload.url) {
            throw ApiError.badRequest(
                '[media]: Url is required, if source type is url'
            );
        }

        const oldMedia = await Media.findById(id);

        if (oldMedia?.sourceType === 'file') {
            //TODO: delete file
            console.log('[media]: delete file ', oldMedia.file);
        }

        const media = await Media.findByIdAndUpdate(id, payload, { new: true });

        if (!media) {
            throw ApiError.notFound('Media not found');
        }
        return media;
    }

    async deleteMedia(id: string) {
        const media = await Media.findByIdAndDelete(id);
        if (!media) {
            throw ApiError.notFound('Media not found');
        }
        //TODO: delete file
        return media;
    }

    async findMediaById(id: string) {
        const media = await Media.findById(id);
        if (!media) {
            // throw ApiError.notFound('Media not found');
            return undefined;
        }
        return media as MediaDocument;
    }
}

export default new MediaService();
