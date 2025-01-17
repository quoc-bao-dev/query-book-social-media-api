import ApiError from '../core/ApiError';
import {
    CreateWorkExperienceInput,
    UpdateWorkExperienceInput,
    WorkExperienceServiceInput,
} from '../models/types/workExperience.type';
import WorkExperience from '../models/workExperience.schema';
import jobTitleService from './jobTitle.service';
import userService from './user.service';

class WorkExperienceService {
    async create(payload: WorkExperienceServiceInput) {
        const user = await userService.findUserById(payload.userId);
        if (!user) {
            throw ApiError.notFound('User not found');
        }

        const title = await jobTitleService.findJobTitleById(
            payload.jobTitleId
        );

        if (!title) {
            throw ApiError.notFound('User not found');
        }

        const workPayload: CreateWorkExperienceInput = {
            company: payload.company,
            jobTitleId: title.id,
            startDate: payload.endDate,
            userId: user.id,
            description: payload.description,
        };

        const workExperience = await WorkExperience.create(workPayload);

        return workExperience;
    }

    async getWorkExperiences(userId: string) {
        const workExperiences = await WorkExperience.find({ userId });
        return workExperiences;
    }

    async getWorkExperienceById(id: string) {
        const workExperience = await WorkExperience.findById(id);
        return workExperience;
    }

    async updateWorkExperience(
        id: string,
        userId: string,
        payload: UpdateWorkExperienceInput
    ) {
        const workExperience = await WorkExperience.findById(id);
        if (!workExperience) {
            throw ApiError.notFound('Work experience not found');
        }

        const user = await userService.findUserById(userId);
        if (!user) {
            throw ApiError.notFound('User not found');
        }

        if (workExperience.userId !== user.id) {
            throw ApiError.forbidden(
                'You are not allowed to update this work experience'
            );
        }

        if (payload.company) {
            workExperience.company = payload.company;
        }

        if (payload.jobTitleId) {
            const title = await jobTitleService.findJobTitleById(
                payload.jobTitleId
            );
            if (!title) {
                throw ApiError.notFound('Job title not found');
            }
            workExperience.jobTitleId = title.id;
        }

        if (payload.startDate) {
            workExperience.startDate = payload.startDate;
        }

        if (payload.endDate) {
            workExperience.endDate = payload.endDate;
        }

        if (payload.description) {
            workExperience.description = payload.description;
        }

        await workExperience.save();
        return workExperience;
    }

    async deleteWorkExperience(id: string, userId: string) {
        const workExperience = await WorkExperience.findById(id);
        if (!workExperience) {
            throw ApiError.notFound('Work experience not found');
        }

        const user = await userService.findUserById(userId);
        if (!user) {
            throw ApiError.notFound('User not found');
        }

        if (workExperience.userId !== user.id) {
            throw ApiError.forbidden(
                'You are not allowed to delete this work experience'
            );
        }

        await workExperience.deleteOne();
        return workExperience;
    }
}

export default new WorkExperienceService();
