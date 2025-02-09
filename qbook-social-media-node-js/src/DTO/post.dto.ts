import { ObjectId } from 'mongoose';
import { HashtagDocument } from '../models/hashtag.schema';
import mediaSchema, { MediaDocument } from '../models/media.schema';
import { PostDocument } from '../models/post.schema';
import { UserDocument } from '../models/user.schema';
import { LikeDocument } from '../models/like.schema';
import { CommentDocument } from '../models/comment.schema';
import MediaDTO from './media.dto';
import userService from '../services/user.service';
import mediaService from '../services/media.service';

class PostDTO {
    id: string;
    userId: ObjectId | UserDocument;
    content: string;
    likes: (string | LikeDocument)[];
    comments: (string | CommentDocument)[];
    hashTags: (string | HashtagDocument)[];
    media: (string | MediaDocument)[];
    status: string;
    view: number;
    interestScore: number;
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(payload: PostDocument) {
        console.log('[payload]: ', payload.likes);

        this.id = payload.id;
        this.userId = payload.userId;
        this.content = payload.content;
        this.likes = payload.likes;
        this.comments = payload.comments;
        this.hashTags = payload.hashTags;
        this.media = payload.media;
        this.status = payload.status;
        this.view = payload.view;
        this.interestScore = payload.interestScore;
        this.isBlocked = payload.isBlocked;
        this.createdAt = payload.createdAt;
        this.updatedAt = payload.updatedAt;
    }

    async toResponse() {
        const user = this.userId as UserDocument;
        const hashTags = (this.hashTags as HashtagDocument[]).map(
            (item) => item.name
        );

        const media = (this.media as MediaDocument[]).map((item) => ({
            url: item.url,
            file: item.file,
            type: item.type,
            sourceType: item.sourceType,
        }));

        const mediaUrls =
            this.media &&
            (await Promise.all(
                this.media.map(async (item) => {
                    return new MediaDTO(item as MediaDocument).toUrl();
                })
            ));

        const likes = await Promise.all(
            (this.likes as LikeDocument[]).map(async (item) => {
                const user = await userService.findUserById(
                    item.userId.toString()
                );
                const avatarMedia = await mediaSchema.findById(user.avatar);
                const avatarUrl = new MediaDTO(
                    avatarMedia as MediaDocument
                ).toUrl();
                return {
                    name: `${user.firstName} ${user.lastName}`,
                    avatar: user.avatar,
                    avatarUrl,
                    handle: user.handle,
                };
            })
        );

        const comments = (this.comments as CommentDocument[]).map((item) => {
            const user = item.userId as UserDocument;

            const media = item.media as MediaDocument;
            return {
                id: item.id,
                username: user.username,
                avatar: user.avatar,
                content: item.content,
                likes: item.likes,
                replies: item.replies,
                media: media && {
                    url: media.url,
                    file: media.file,
                    type: media.type,
                    sourceType: media.sourceType,
                },
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            };
        });

        const avatarMedia = await mediaSchema.findById(user.avatar);

        const avatarUrl =
            user.avatar && avatarMedia && new MediaDTO(avatarMedia).toUrl();

        return {
            id: this.id,
            author: {
                name: user.username,
                fullName: `${user.firstName} ${user.lastName}`,
                email: user.email,
                avatar: user.avatar,
                avatarUrl,
            },
            content: this.content,
            likesCount: this.likes.length,
            likes: likes,
            commentsCount: this.comments.length,
            comments: comments,
            hashTags: hashTags,
            media: media,
            mediaUrls,
            status: this.status,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}

export default PostDTO;
