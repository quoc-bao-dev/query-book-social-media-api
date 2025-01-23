import { JobTitleDocument } from '../models/jobTitle.schema';

class JobTitleDTO {
    id: string;
    title: string;
    description?: string;
    popularity: number;
    constructor(jobTitle: JobTitleDocument) {
        this.id = jobTitle.id.toString();
        this.title = jobTitle.title;
        this.description = jobTitle.description;
        this.popularity = jobTitle.popularity;
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
