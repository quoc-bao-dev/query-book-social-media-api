import Hashtag, { HashtagDocument } from '../models/hashtag.schema';
class HashTagService {
    async create(name: string) {
        const hashTagInDB = await this.findHashTagByName(name);
        if (hashTagInDB) {
            hashTagInDB.usageCount++;
            await hashTagInDB.save();
            return hashTagInDB as HashtagDocument;
        } else {
            const hashTag = await Hashtag.create({ name });
            return hashTag as HashtagDocument;
        }
    }
    async findHashTagByName(name: string) {
        return await Hashtag.findOne({ name });
    }
}

export default new HashTagService();
