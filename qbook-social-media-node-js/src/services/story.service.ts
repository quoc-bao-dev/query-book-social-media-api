import ApiError from '../core/ApiError';
import StoryDTO from '../DTO/story.dto';
import Story from '../models/story.schema';
import {
    CreateStoryInput,
    CreateStoryServiceInput,
} from '../models/types/service.type';
import { UserDocument } from '../models/user.schema';
import mediaService from './media.service';
import userService from './user.service';

class StoryService {
    async getStories(userId: string) {
        const user = await userService.findUserProfileById(userId);
        const conditionSearch = {} as any;

        conditionSearch['$or'] = [
            {
                status: { $in: ['friend'] },
                userId: {
                    $in: [...user.friends.map((id) => id.toString())],
                },
            },
            { status: { $in: ['friend', 'private'] }, userId },
            { status: 'public' },
        ];

        const stories = await Story.find(conditionSearch)
            .sort({
                createdAt: -1,
            })
            .populate('media userId viewer');

        return stories.map((story) => new StoryDTO(story).toResponse());
    }
    async create(payload: CreateStoryServiceInput) {
        const user = await userService.findUserById(payload.userId);
        payload.media;
        const media = await mediaService.create({
            userId: user.id,
            url: payload.media.url,
            file: payload.media.fileName,
            type: payload.media.type,
            sourceType: payload.media.sourceType,
        });

        const ttl = 24 * 60 * 60 * 1000;
        const storyPayload: CreateStoryInput = {
            userId: user.id,
            content: payload.content,
            media: media.id,
            expireAt: new Date(Date.now() + ttl),
        };

        const story = await Story.create(storyPayload);

        return story;
    }

    async getStoryById(id: string, userId?: string) {
        const story = await Story.findById(id);

        if (!story) {
            throw ApiError.notFound('Story not found');
        }

        let user: UserDocument | undefined = undefined;
        if (userId) {
            user = await userService.findUserById(userId);
            const isSeen = story.viewer.includes(user.id);
            if (!isSeen) {
                story.viewer.push(user.id);
            }
        }

        await story.populate('media userId viewer');

        await story.save();

        return new StoryDTO(story).toResponse();
    }
}

export default new StoryService();
