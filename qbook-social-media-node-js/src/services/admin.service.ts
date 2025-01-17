import ApiError from '../core/ApiError';
import Admin from '../models/admin.schema';
import { AdminRoleType } from '../models/types/type';
import User from '../models/user.schema';
import { genAdminAccessToken } from '../utils/authToken.utils';
import { comparePassword, hashPassword } from '../utils/bcrypt.utils';
class AdminService {
    async login(email: string, password: string) {
        const user = await Admin.findOne({ email });
        if (!user) {
            throw ApiError.badRequest('Email not found');
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            throw ApiError.badRequest('Password is incorrect');
        }

        const accessToken = genAdminAccessToken({
            adminId: user.id.toString(),
            role: user.role,
        });
        return {
            accessToken,
        };
    }

    async createAccount({
        email,
        username,
        password,
        role,
    }: {
        email: string;
        username: string;
        password: string;
        role: AdminRoleType;
    }) {
        const findExistingEmail = await Admin.findOne({ email });
        if (findExistingEmail) {
            throw ApiError.conflict('Email already exists');
        }
        const findExistingUsername = await Admin.findOne({ username });
        if (findExistingUsername) {
            throw ApiError.conflict('Username already exists');
        }

        const passwordHashed = await hashPassword(password);

        const findExitUser = await User.findOne({ email });
        if (findExitUser) {
            throw ApiError.conflict("Email of user can't be same as admin");
        }

        const admin = await Admin.create({
            email,
            username,
            password: passwordHashed,
            role,
        });
        return admin;
    }
}

export default new AdminService();
