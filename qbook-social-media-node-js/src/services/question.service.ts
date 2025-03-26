import config from '../config/config';
import ApiError from '../core/ApiError';
import MediaDTO from '../DTO/media.dto';
import answerSchema from '../models/answer.schema';
import hashtagSchema from '../models/hashtag.schema';
import questionSchema, { QuestionDocument } from '../models/question.schema';
import saveQuestionSchema from '../models/saveQuestion.schema';
import topicSchema from '../models/topic.schema';
import hashTagService from './hashTag.service';

class QuestionService {
    private userOption = {
        path: 'userId',
        select: 'name email avatar firstName lastName', // Chỉ lấy các trường cần thiết
        populate: {
            path: 'avatar', // Populate avatar từ bảng Media
        },
    };

    private mapUser = (questions: QuestionDocument[]) =>
        questions.map((question) => {
            const user = question.userId.toObject();
            return {
                ...question.toObject(),
                userId: {
                    ...user,
                    avatarUrl:
                        user?.avatar && new MediaDTO(user.avatar).toUrl(),
                },
                images: question.images.map(
                    (item) => `${config.IMAGE_SERVER}/${item}`
                ),
            };
        });
    async create(payload: any) {
        const hashtags =
            payload.hashtags && payload.hashtags.length > 0
                ? await Promise.all(
                      payload.hashtags.map((item: string) =>
                          hashTagService.create(item)
                      )
                  )
                : [];

        payload.hashtags = hashtags.map((item) => item._id.toString());

        const question = await questionSchema.create(payload);

        const result = question;

        return result;
    }

    async getById(id: string) {
        const question = await questionSchema
            .findById(id)
            .populate(this.userOption)
            .populate(['hashtags', 'topic'])
            .exec();

        const result = {
            ...question?.toObject(),
            userId: {
                ...question?.userId.toObject(),
                avatarUrl:
                    question?.userId?.avatar &&
                    new MediaDTO(question?.userId?.avatar).toUrl(),
            },
            images: question?.images.map(
                (item) => `${config.IMAGE_SERVER}/${item}`
            ),
        };

        return result;
    }

    async getAll(
        limit = 10,
        page = 1,
        {
            search,
            hashtags,
            topic,
        }: { search?: string; hashtags?: string; topic?: string }
    ) {
        const query: any = {};
        query;
        if (hashtags) {
            const hashtagIdsList = (
                await hashtagSchema
                    .find({ name: { $in: hashtags.split(',') } })
                    .select('_id')
                    .lean()
            ).map((item) => item._id);

            query.hashtags = { $in: hashtagIdsList };
        }
        if (topic) {
            const topicIdsList = (
                await topicSchema
                    .find({ name: { $in: topic.split(',') } })
                    .select('_id')
                    .lean()
            ).map((item) => item._id);

            query.topic = { $in: topicIdsList };
        }
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } }, // Tìm kiếm trong tiêu đề (không phân biệt hoa thường)
                { question: { $regex: search, $options: 'i' } }, // Tìm kiếm trong nội dung
            ];
        }

        console.log('[query]', query);

        const questions = await questionSchema
            .find(query)
            .limit(limit)
            .skip((page - 1) * limit)
            .populate(this.userOption)
            .populate(['hashtags', 'topic'])
            .exec();

        const processedQuestions = this.mapUser(questions);

        const result = processedQuestions;

        return {
            data: result,
            pagination: {
                limit,
                page,
                total: await questionSchema.countDocuments(query),
            },
        };
    }

    async getByUserId(userId: string) {
        const questions = await questionSchema
            .find({ userId })
            .populate(this.userOption)
            .populate(['hashtags', 'topic'])
            .exec();

        const processedQuestions = this.mapUser(questions);

        const result = processedQuestions;

        return result;
    }

    getSearch({ hashtags, topic }: { hashtags: string[]; topic: string }) {
        const query: any = {};

        if (hashtags && hashtags.length > 0) {
            query.hashtags = { $in: hashtags };
        }

        if (topic) {
            query.topic = topic;
        }

        const questions = questionSchema
            .find(query)
            .populate(this.userOption)
            .populate(['hashtags', 'topic'])
            .exec();

        return questions;
    }

    async updateQuestion(questionId: string, payload: any, userId: string) {
        const question = await questionSchema.findById(questionId);

        const { content, code } = payload;

        if (question?.userId.toString() !== userId) {
            throw ApiError.forbidden(
                'You do not have permission to update this question'
            );
        }

        question.question = content || question.question;
        question.code = code || question.code;

        await question.save();
        return question;
    }

    async delete(questionId: string, userId: string) {
        const question = await questionSchema.findById(questionId);

        if (!question) {
            throw ApiError.badRequest('Question not found');
        }

        if (question?.userId.toString() !== userId) {
            throw ApiError.forbidden(
                'You are not authorized to delete this question'
            );
        }
        await saveQuestionSchema.findOneAndDelete({
            questionId,
        });

        await answerSchema.deleteMany({
            questionId,
        });

        await question.deleteOne();
        return question;
    }
}

export default new QuestionService();
