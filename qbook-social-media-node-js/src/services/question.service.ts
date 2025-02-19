import MediaDTO from '../DTO/media.dto';
import questionSchema, { QuestionDocument } from '../models/question.schema';
import { UserDocument } from '../models/user.schema';
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
            };
        });
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
            .populate(this.userOption)
            .populate('hashtags')
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
            .populate('hashtags')
            .exec();

        const processedQuestions = this.mapUser(questions);

        const result = processedQuestions;

        return result;
    }
}

export default new QuestionService();
