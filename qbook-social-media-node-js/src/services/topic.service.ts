import topicSchema from '../models/topic.schema';

class TopicService {
    async create(payload: any) {
        const topic = await topicSchema.create({
            description: payload.description,
            name: payload.name,
        });

        return topic;
    }

    async getAll(payload: any) {
        const { limit, page } = payload;
        const topic = await topicSchema.find().limit(limit).skip(page);
        return topic;
    }
}
export default new TopicService();
