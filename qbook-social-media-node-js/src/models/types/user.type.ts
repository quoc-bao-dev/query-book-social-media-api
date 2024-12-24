import { UserDocument } from '../user.schema';

export type CreateUserInput = Pick<
    UserDocument,
    'username' | 'password' | 'email'
>;

export type UpdateUserInput = Partial<
    Omit<UserDocument, 'id' | 'email' | 'handle'>
>;
