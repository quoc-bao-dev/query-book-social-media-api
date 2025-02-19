import MediaDTO from '../DTO/media.dto';
import questionSchema from '../models/question.schema';
import hashTagService from './hashTag.service';

class QuestionService {
    async create(payload: any) {
        const hashtags = await Promise.all(
            payload.hashtags.map((item: string) => hashTagService.create(item))
        );

        payload.hashtags = hashtags.map((item) => item._id.toString());

        const question = await questionSchema.create(payload);

        const result = question;

        return result;
    }

    async getAll(limit = 10, page = 1, search: any) {
        const query: any = {};

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } }, // Tìm kiếm trong tiêu đề (không phân biệt hoa thường)
                { question: { $regex: search, $options: 'i' } }, // Tìm kiếm trong nội dung
            ];
        }

        const questions = await questionSchema
            .find(query)
            .limit(limit)
            .skip((page - 1) * limit)
            .populate({
                path: 'userId',
                select: 'name email avatar', // Chỉ lấy các trường cần thiết
                populate: {
                    path: 'avatar', // Populate avatar từ bảng Media
                },
            })
            .populate('hashtags')
            .exec();

        const processedQuestions = questions.map((question) => {
            const user = question.userId.toObject();
            return {
                ...question.toObject(),
                userId: {
                    ...user,
                    avatarUrl:
                        user?.avatar && new MediaDTO(user.avatar).toUrl(),
                },
            };
        });

        const result = processedQuestions;

        console.log('[questions]', questions);

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
            .populate('hashtags')
            .exec();

        const result = questions;

        return result;
    }
}

export default new QuestionService();
