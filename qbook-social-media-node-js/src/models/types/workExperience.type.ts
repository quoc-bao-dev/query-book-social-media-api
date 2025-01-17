import { WorkExperienceDocument } from '../workExperience.schema';

export type WorkExperienceBody = {
    jobTitleId: string;
    company: string;
    description: string;
    startDate: Date;
    endDate?: Date;
};

export type WorkExperienceServiceInput = WorkExperienceBody & {
    userId: string;
};

export type CreateWorkExperienceInput = Pick<
    WorkExperienceDocument,
    | 'userId'
    | 'jobTitleId'
    | 'company'
    | 'description'
    | 'startDate'
    | 'endDate'
>;

export type UpdateWorkExperienceInput = Partial<WorkExperienceBody>;
