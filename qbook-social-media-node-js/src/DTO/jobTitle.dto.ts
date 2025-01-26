import { ObjectId } from 'mongoose';
import { JobTitleDocument } from '../models/jobTitle.schema';

class JobTitleDTO {
    id: string;
    title: string;
    description?: string;
    popularity: number;
    constructor(payload: JobTitleDocument) {
        this.id = (payload._id as ObjectId).toString();
        this.title = payload.title;
        this.description = payload.description;
        this.popularity = payload.popularity;
    }

    toResponse() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
        };
    }
}

export default JobTitleDTO;
