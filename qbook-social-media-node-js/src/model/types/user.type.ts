import { UserDocument } from '../user.schema';

export type CreateUserRequest = {};

export type CreateUserInput = Pick<UserDocument, 'username' | 'password'>;

export type UpdateUserInput = Partial<
    Omit<UserDocument, 'id' | 'email' | 'handle'>
>;
