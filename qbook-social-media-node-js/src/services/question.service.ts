import questionSchema from '../models/question.schema';
import hashTagService from './hashTag.service';

class QuestionService {
    async create(payload: any) {
        const hashtags = await Promise.all(
            payload.hashtags.map((item: string) => hashTagService.create(item))
        );

        payload.hashtags = hashtags.map((item) => item._id);

        const question = await questionSchema.create(payload);

        const result = question;

        return result;
    }

    async getAll() {
        const questions = await questionSchema.find();

        const result = questions;

        return result;
    }

    async getByUserId(userId: string) {
        const questions = await questionSchema.find({ userId });

        const result = questions;

        return result;
    }
}

export default new QuestionService();
