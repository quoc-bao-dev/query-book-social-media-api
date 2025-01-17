import { UserDocument } from '../user.schema';
import { UserProfileDocument } from '../userProfile.schema';
import { CreateMediaBody } from './media.type';
import { SocialType } from './type';

export type CreateUserInput = Pick<
    UserDocument,
    'username' | 'password' | 'email'
>;

export type UpdateUserBody = {
    firstName?: string;
    lastName?: string;
    handle?: string;
    avatar?: CreateMediaBody;
    bio?: string;
    phone?: string;
    coverPage?: CreateMediaBody;
    jobTitle?: string;
    socials: {
        type: SocialType;
        url: string;
    }[];
    links: {
        title: string;
        url: string;
    }[];
    skills: {
        name: string;
        display: string;
    }[];
    projects: {
        projectName: string;
        description: string;
        startDate: Date;
        endDate: Date;
        url: string;
    }[];
};

export type UpdateUserServiceInput = UpdateUserBody;
export type UpdateUserInput = Partial<
    Pick<
        UserDocument & UserProfileDocument,
        | 'firstName'
        | 'lastName'
        | 'handle'
        | 'avatar'
        | 'bio'
        | 'phone'
        | 'coverPage'
        | 'jobTitle'
        | 'socials'
        | 'links'
        | 'skills'
        | 'projects'
    >
>;
