import questionSchema from '../models/question.schema';

class QuestionService {
    async create(payload: any) {
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
