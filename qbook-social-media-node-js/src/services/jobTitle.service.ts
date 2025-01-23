import ApiError from '../core/ApiError';
import JobTitleDTO from '../DTO/jobTitle.dto';
import JobTitle, { JobTitleDocument } from '../models/jobTitle.schema';
import { CreateJobTitleServiceInput } from '../models/types/jobTitle.type';

class JobTitleService {
    async getJobTitles() {
        const jobTitles = await JobTitle.find();

        const result = jobTitles.map((jobTitle) => new JobTitleDTO(jobTitle));
        return result;
    }

    async create(payload: CreateJobTitleServiceInput) {
        const isExitJobTitle = await JobTitle.findOne({ title: payload.title });

        if (isExitJobTitle) {
            throw ApiError.conflict('Job title already exists');
        }

        const jobTitle = await JobTitle.create(payload);

        return jobTitle as JobTitleDocument;
    }

    async findJobTitleById(id: string) {
        const jobTitle = await JobTitle.findById(id);
        if (!jobTitle) {
            throw ApiError.notFound('Job title not found');
        }

        return jobTitle;
    }
}

export default new JobTitleService();
