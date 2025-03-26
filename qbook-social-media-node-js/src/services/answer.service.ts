import { Types } from 'mongoose';
import config from '../config/config';
import ApiError from '../core/ApiError';
import MediaDTO from '../DTO/media.dto';
import answerSchema from '../models/answer.schema';
import questionSchema from '../models/question.schema';

class AnswerService {
    async getByQuestionId(questionId: string) {
        const answers = await answerSchema
            .find({ questionId })
            .populate([
                {
                    path: 'userId',
                    select: 'email avatar firstName lastName',
                    populate: {
                        path: 'avatar',
                    },
                },
                {
                    path: 'votes',
                    populate: {
                        path: 'user',
                        select: 'email avatar firstName lastName',
                        populate: {
                            path: 'avatar',
                        },
                    },
                },
            ])
            .exec();

        const result = answers.map((answer) => {
            const user = answer?.userId;
            const avatar = user?.avatar;

            return {
                ...answer.toObject(),
                userId: {
                    ...user?.toObject(),
                    avatarUrl: avatar ? new MediaDTO(avatar).toUrl() : null,
                },
                images: answer.images.map(
                    (item) => `${config.IMAGE_SERVER}/${item}`
                ),
                votes: answer.votes.map((vote) => {
                    const user = vote.user;
                    const avatar = user.avatar;
                    return {
                        ...vote.toObject(),
                        user: {
                            ...user.toObject(),
                            avatarUrl: avatar
                                ? new MediaDTO(avatar).toUrl()
                                : null,
                        },
                    };
                }),
            };
        });

        return result;
    }
    async create(payload: any) {
        const answer = await answerSchema.create(payload);
        return answer;
    }

    async vote(answerId: string, userId: string, vote: 'up' | 'down') {
        const answer = await answerSchema
            .findById(answerId)
            .populate('votes')
            .exec();
        if (!answer) {
            throw new Error('Answer not found');
        }
        const votes = answer.votes;

        const index = votes.findIndex((v) => v.user.toString() === userId);

        if (index !== -1) {
            votes[index].voteType = vote;
        } else {
            votes.push({
                user: new Types.ObjectId(userId),
                voteType: vote,
            });
        }

        await answer.save();
        return answer;
    }

    async update(answerId: string, payload: any, userId: string) {
        const answer = await answerSchema.findById(answerId);
        if (answer?.userId.toString() !== userId) {
            throw ApiError.forbidden(
                'You do not have permission to update this answer'
            );
        }

        if (payload.content) {
            answer.content = payload.content;
        }

        if (payload.code) {
            answer.code = payload.code;
        }

        await answer.save();

        return answer;
    }

    async delete(answerId: string, userId: string) {
        const answer = await answerSchema.findById(answerId);
        const question = await questionSchema.findById(
            answer?.questionId.toString()
        );

        if (!answer) {
            throw ApiError.notFound('Answer not found');
        }

        if (
            userId !== question?.userId.toString() &&
            userId !== answer.userId.toString()
        ) {
            throw ApiError.forbidden(
                'You do not have permission to delete this answer'
            );
        }

        await answer.deleteOne();
        return answer;
    }
}

export default new AnswerService();
