import MediaDTO from '../DTO/media.dto';
import answerSchema from '../models/answer.schema';

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
            };
        });

        return result;
    }
    async create(payload: any) {
        const answer = await answerSchema.create(payload);
        return answer;
    }
}

export default new AnswerService();
