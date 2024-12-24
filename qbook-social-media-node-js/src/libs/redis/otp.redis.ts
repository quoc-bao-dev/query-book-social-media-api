import redis from '.';

export const activeAccountRedis = {
    setOTP: async (userId: string, otp: string) => {
        try {
            await redis.set(`opt-active-account:${userId}`, otp, 'EX', 60 * 5);
        } catch (error) {
            console.error('Error setting OTP to Redis:', error);
        }
    },
    getOTP: async (userId: string) => {
        try {
            const otp = await redis.get(`opt-active-account:${userId}`);
            return otp;
        } catch (error) {
            console.error('Error getting OTP from Redis:', error);
            return null;
        }
    },
    deleteOTP: async (userId: string) => {
        try {
            await redis.del(`opt-active-account:${userId}`);
        } catch (error) {
            console.error('Error deleting OTP from Redis:', error);
        }
    },
};
