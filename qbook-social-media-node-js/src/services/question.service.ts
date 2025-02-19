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

    async getAll() {
        const questions = await questionSchema
            .find()
            .populate('hashtags')
            .exec();

        const result = questions;

        return result;
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
