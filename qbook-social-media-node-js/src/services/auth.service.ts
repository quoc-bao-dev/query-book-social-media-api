import ApiError from '../core/ApiError';
import check2fa from '../libs/redis/check2fa.redis';
import { activeAccountRedis } from '../libs/redis/otp.redis';
import { CreateUserInput } from '../models/types/user.type';
import User from '../models/user.schema';
import {
    genAccessToken,
    genActiveAccountToken,
    genRefreshToken,
    genTowFAToken,
} from '../utils/authToken.utils';
import { comparePassword, hashPassword } from '../utils/bcrypt.utils';
import { toHandleName } from '../utils/convertString';
import { sendEmail } from '../utils/nodeMailer.utils';
import { generateOTP } from '../utils/otp.utils';
import tokenService from './token.service';

class AuthService {
    async register({ email, username, password }: CreateUserInput) {
        const findExistingEmail = await User.findOne({ email });
        if (findExistingEmail) {
            throw ApiError.conflict('Email already exists');
        }

        const findExistingUsername = await User.findOne({ username });
        if (findExistingUsername) {
            throw ApiError.conflict('Username already exists');
        }

        const passwordHashed = await hashPassword(password);

        const handle = toHandleName(username);

        const findExistingHandle = await User.findOne({ handle });
        if (findExistingHandle) {
            throw ApiError.conflict('Handle already exists');
        }

        const user = await User.create({
            username,
            email,
            password: passwordHashed,
            handle,
        });

        if (!user) {
            throw ApiError.badRequest('User not created');
        }

        const OTP = generateOTP();
        const userId = (user as { id: string }).id.toString();

        await activeAccountRedis.setOTP(userId, OTP);

        sendEmail({
            to: email,
            subject: 'Verify your email',
            text: `Use the following OTP to verify your email: ${OTP}`,
            userName: username,
            otp: OTP,
        });

        const token = genActiveAccountToken(userId);

        return token;
    }

    async activeAccount(userId: string, otp: string) {
        const OTPOfUser = await activeAccountRedis.getOTP(userId);

        if (OTPOfUser !== otp) {
            throw ApiError.badRequest('OTP is invalid');
        }

        await activeAccountRedis.deleteOTP(userId);
        await User.updateOne({ _id: userId }, { $set: { isActive: true } });

        const accessToken = genAccessToken(userId);
        const refreshToken = genRefreshToken(userId);

        return {
            accessToken,
            refreshToken,
        };
    }
    async login(email: string, password: string) {
        const user = await User.findOne({ email });
        if (!user) {
            throw ApiError.badRequest('Email not found');
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            throw ApiError.badRequest('Password is incorrect');
        }

        if (!user.isActive) {
            throw ApiError.badRequest('User is not active');
        }

        if (user.isBlock) {
            throw ApiError.badRequest('User is blocked');
        }

        if (user.isTwoFactorAuthEnabled) {
            const OTP = generateOTP();
            sendEmail({
                to: email,
                subject: 'Verify your email',
                text: `Use the following OTP to verify your email: ${OTP}`,
                userName: user.username,
                otp: OTP,
            });
            const twoFaToken = genTowFAToken(user.id.toString());

            await check2fa.setOTP(user.id.toString(), OTP);
            return {
                status: 'enable-2fa',
                twoFaToken,
            };
        }

        const accessToken = genAccessToken(user.id.toString());
        const refreshToken = genRefreshToken(user.id.toString());

        await tokenService.addRefreshToken(user.id.toString(), refreshToken);

        return {
            accessToken,
            refreshToken,
        };
    }
    async verify2Fa(userId: string, otp: string) {
        const OTPOfUser = await check2fa.getOTP(userId);

        if (OTPOfUser !== otp) {
            throw ApiError.badRequest('OTP is invalid');
        }

        await check2fa.deleteOTP(userId);

        const accessToken = genAccessToken(userId);
        const refreshToken = genRefreshToken(userId);
        await tokenService.addRefreshToken(userId, refreshToken);

        return {
            accessToken,
            refreshToken,
        };
    }
}

export default new AuthService();
