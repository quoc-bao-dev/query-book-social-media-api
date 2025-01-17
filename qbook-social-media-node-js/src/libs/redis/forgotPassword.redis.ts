import { verify } from 'crypto';
import redis from '.';
import e from 'cors';

const forgotPasswordRedis = {
    setOTP(userId: string, otp: string) {
        redis.set(`opt-forgot-password:${userId}`, otp, 'EX', 60 * 5);
    },
    async verifyOTP(userId: string, otp: string) {
        const otpOfUser = await redis.get(`opt-forgot-password:${userId}`);
        if (otpOfUser === otp) {
            redis.del(`opt-forgot-password:${userId}`);
            return true;
        }
        return false;
    },

    async deleteOTP(userId: string) {
        try {
            await redis.del(`opt-forgot-password:${userId}`);
        } catch (error) {
            console.error('Error deleting OTP from Redis:', error);
        }
    },
};

export default forgotPasswordRedis;
