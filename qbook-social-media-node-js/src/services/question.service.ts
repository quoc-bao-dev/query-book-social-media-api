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
            .skip(page)
            .populate('hashtags')
            .exec();

        const result = questions;

        console.log({
            limit,
            page,
            total: await questionSchema.countDocuments(),
        });

        return {
            data: result,
            pagination: {
                limit,
                page,
                total: await questionSchema.countDocuments(),
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
