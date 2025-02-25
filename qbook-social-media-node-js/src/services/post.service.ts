import ApiError from '../core/ApiError';
import PostDTO from '../DTO/post.dto';
import Post from '../models/post.schema';
import {
    CreatePostInput,
    CreatePostServiceInput,
    UpdatePostInput,
} from '../models/types/post.type';
import hashTagService from './hashTag.service';
import mediaService from './media.service';
import userService from './user.service';

class PostService {
    async create(payload: CreatePostServiceInput) {
        const userInDB = await userService.findUserById(payload.userId);
        const userId = userInDB.id;

        const media =
            payload.media &&
            (await Promise.all(
                payload.media?.map(async (item) => {
                    const media = await mediaService.create({
                        userId: userId,
                        file: item.fileName,
                        url: item.url,
                        type: item.type,
                        sourceType: item.sourceType,
                    });
                    return media.id;
                })
            ));

        const lstHashTags =
            payload.hashTags &&
            (await Promise.all(
                payload.hashTags.map(async (item) => {
                    const hashTag = await hashTagService.create(item);
                    return hashTag.id;
                })
            ));

        const postPayload: CreatePostInput = {
            userId: userId,
            content: payload.content,
            status: payload.status,
            hashTags: lstHashTags,
            media: media,
            createdAt: payload.createdAt,
            updatedAt: payload.updatedAt,
        };

        const post = await Post.create(postPayload);

        const newPost = await post.populate(
            'hashTags media userId likes comments'
        );
        return new PostDTO(newPost).toResponse();
    }

    async getPosts({
        userId,
        limit,
        page,
        query,
    }: {
        userId?: string;
        page: number;
        limit: number;
        query?: any;
    }) {
        const skip = (page - 1) * limit;

        const conditionSearch = {} as any;
        conditionSearch['isDeleted'] = { $in: [false, undefined] };

        if (userId) {
            const user = await userService.findUserProfileById(userId);

            const friends = [
                ...user.friends.map((id) => id.toString()),
                userId,
            ];

            conditionSearch['$or'] = [
                {
                    status: 'public',
                },
                {
                    status: 'private',
                    userId: userId,
                },
                {
                    status: {
                        $in: ['friend', 'public'],
                    },
                    userId: {
                        $in: friends,
                    },
                },
                {
                    status: {
                        $in: ['public'],
                    },
                    userId: {
                        $in: user.followings,
                    },
                },
            ];
        } else {
            conditionSearch['status'] = 'public';
        }

        const lsPost = await Post.find(conditionSearch)
            .populate('hashTags media userId likes comments')
            .sort({ interestScore: -1 })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const lsResult = await Promise.all(
            lsPost.map(async (item) => await new PostDTO(item).toResponse())
        );
        return {
            pagination: {
                page: page,
                limit: limit,
                total: await Post.countDocuments(conditionSearch),
            },
            data: lsResult,
        };
    }

    async getPostById(id: string) {
        const post = await Post.findOne({
            _id: id,
            isDeleted: { $in: [false, undefined] },
        }).populate('hashTags media userId likes comments');

        if (post?.view) {
            post.view += 1;
            await post?.save();
        }

        if (post?.interestScore) {
            post.interestScore += 1;
            await post?.save();
        }

        if (!post) {
            throw ApiError.notFound('Post not found');
        }

        // const populatedPost = await post.populate(
        //     'likes.userId comments.userId comments.media'
        // );

        return await new PostDTO(post).toResponse();
    }

    async getPostByUserId(userId: string, curUerId?: string) {
        const conditionSearch = {
            userId,
            isDeleted: { $in: [false, undefined] },
        } as any;
        conditionSearch['$or'] = [
            {
                status: 'public',
            },
        ];
        if (curUerId) {
            const user = await userService.findUserProfileById(curUerId);
            const lsFriends = user.friends.map((id) => id.toString());
            conditionSearch['$or'] = [
                ...conditionSearch['$or'],
                {
                    status: 'friend',
                    userId: { $in: lsFriends },
                },
                { status: 'friend', userId: curUerId },
                {
                    status: 'private',
                    userId: curUerId,
                },
            ];
        }
        const post = await Post.find(conditionSearch)
            .sort({ createdAt: -1 })
            .populate('hashTags media userId likes comments');

        if (!post) {
            throw ApiError.notFound('Post not found');
        }

        const result = await Promise.all(
            post.map((p) => new PostDTO(p).toResponse())
        );

        return result;
    }

    async updatePost(id: string, userId: string, payload: UpdatePostInput) {
        const post = await this.findPostById(id);
        const user = await userService.findUserProfileById(userId);

        if (post.userId.toString() !== userId) {
            throw ApiError.forbidden('You are not allowed to update this post');
        }

        if (payload.content) {
            post.content = payload.content;
        }

        if (payload.status) {
            post.status = payload.status!;
        }

        if (payload.hashTags) {
            const lstHashTags = await Promise.all(
                payload.hashTags.map(async (item) => {
                    const hashTag = await hashTagService.create(item as string);
                    return hashTag.id;
                })
            );
            post.hashTags = lstHashTags;
        }

        if (payload.media) {
            await Promise.all(
                payload.media.map(async (item) => {
                    if (item.action === 'add') {
                        const media = await mediaService.create({
                            userId: user.id,
                            file: item.fileName,
                            url: item.url,
                            type: item.type,
                            sourceType: item.sourceType,
                        });
                        post.media.push(media.id);
                    }

                    if (item.action === 'remove') {
                        post.media = post.media.filter(
                            (mediaId) => mediaId.toString() !== item.id
                        );
                        await mediaService.deleteMedia(item.id);
                    }
                })
            );
        }

        await post.save();
        return post;
    }

    async deletePost(id: string, userId: string) {
        const post = await this.findPostById(id);

        if (post.userId.toString() !== userId) {
            throw ApiError.forbidden('You are not allowed to delete this post');
        }

        post.isDeleted = true;
        await post.save();
        return post;
    }
    async findPostById(id: string) {
        const post = await Post.findOne({
            _id: id,
            isDeleted: { $in: [false, undefined] },
        });
        if (!post) {
            throw ApiError.notFound('Post not found');
        }
        return post;
    }
}

export default new PostService();
