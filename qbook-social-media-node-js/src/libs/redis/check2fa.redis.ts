import redis from '.';

const check2fa = {
    getVerify: async (userId: string) => {
        return await redis.get(`2fa-verify:${userId}`);
    },
    setVerify: async (userId: string) => {
        return await redis.set(
            `2fa-verify:${userId}`,
            'verified',
            'EX',
            60 * 5
        );
    },

    getOTP: async (userId: string) => {
        try {
            const otp = await redis.get(`opt-2fa:${userId}`);
            return otp;
        } catch (error) {
            console.error('Error getting OTP from Redis:', error);
            return null;
        }
    },

    setOTP: async (userId: string, otp: string) => {
        try {
            await redis.set(`opt-2fa:${userId}`, otp, 'EX', 60 * 5);
        } catch (error) {
            console.error('Error setting OTP to Redis:', error);
        }
    },

    deleteOTP: async (userId: string) => {
        try {
            await redis.del(`opt-2fa:${userId}`);
        } catch (error) {
            console.error('Error deleting OTP from Redis:', error);
        }
    },
};

export default check2fa;
