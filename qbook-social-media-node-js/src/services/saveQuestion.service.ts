import path from 'path';
import MediaDTO from '../DTO/media.dto';
import saveQuestionSchema, {
    SaveQuestion,
} from '../models/saveQuestion.schema';

class SaveQuestionService {
    private questionOption = [
        {
            path: 'questionId',
            populate: {
                path: 'hashtags',
            },
        },
        {
            path: 'questionId',
            populate: {
                path: 'userId',
                select: 'name email avatar firstName lastName',
                populate: {
                    path: 'avatar',
                },
            },
        },
        {
            path: 'userId',
            select: 'name email avatar firstName lastName',
            populate: {
                path: 'avatar',
            },
        },
    ];
    private mapQuestion(questions: SaveQuestion[]) {
        return questions.map((question) => {
            const questionUser = question?.questionId?.userId;
            const questionAvatar = questionUser?.avatar;
            const userAvatar = question?.userId?.avatar;

            return {
                ...question.toObject(),
                questionId: {
                    ...question.questionId?.toObject(),
                    userId: {
                        ...questionUser?.toObject(),
                        avatarUrl: questionAvatar
                            ? new MediaDTO(questionAvatar).toUrl()
                            : null,
                    },
                },
                userId: {
                    ...question.userId?.toObject(),
                    avatarUrl: userAvatar
                        ? new MediaDTO(userAvatar).toUrl()
                        : null,
                },
            };
        });
    }
    async getByUserId(userId: string) {
        const questions = await saveQuestionSchema
            .find({
                userId,
            })
            .populate(this.questionOption)
            .exec();

        const result = this.mapQuestion(questions);
        return result;
    }
    async create(payload: any) {
        const saveQuestion = await saveQuestionSchema.create(payload);
        return saveQuestion;
    }
}

export default new SaveQuestionService();
