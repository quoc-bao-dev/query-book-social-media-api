import config from '../config/config';
import ApiError from '../core/ApiError';
import addressSchema, { AddressDocument } from '../models/address.schema';
import adminSchema, { AdminDocument } from '../models/admin.schema';
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
        firstName,
        lastName,
        password,
        role,
        bio,
        address,
    }: {
        email: string;
        username: string;
        firstName: string;
        lastName: string;
        password: string;
        role: AdminRoleType;
        bio: string;
        address: AddressDocument;
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

        const addressCreate = await addressSchema.create(address);

        const admin = await Admin.create({
            email,
            username,
            firstName,
            lastName,
            password: passwordHashed,
            role,
            bio,
            address: addressCreate.id,
        });
        return admin;
    }

    async getInfo(id: string) {
        const admin = (await adminSchema
            .findById(id)
            .populate('address')) as AdminDocument;
        const result = this.toAdminResponse(admin);

        return result;
    }

    async getAllAccount() {
        const accounts = await adminSchema.find().populate('address');
        const result = accounts.map((_acc) => this.toAdminResponse(_acc));
        return result;
    }

    async getAllAccountWithPagination({
        limit = 10,
        page = 1,
    }: {
        limit: number;
        page: number;
    }) {
        const accounts = await adminSchema
            .find()
            .limit(limit)
            .skip(page)
            .populate('address');
        const result = accounts.map((_account) =>
            this.toAdminResponse(_account)
        );
        const totalDocument = await adminSchema.countDocuments();
        return {
            data: result,
            total: totalDocument,
            totalPage: Math.floor(totalDocument / limit),
        };
    }

    toAdminResponse(payload: AdminDocument) {
        return {
            id: payload.id,
            username: payload.username,
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            avatar: `${config.IMAGE_SERVER}/${payload.avatar}`,
            address: payload.address,
            bio: payload.bio,
            role: payload.role,
            createdAt: payload.createdAt,
            updatedAt: payload.updatedAt,
        };
    }
}

export default new AdminService();
