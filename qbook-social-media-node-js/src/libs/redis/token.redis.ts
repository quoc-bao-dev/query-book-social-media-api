import redis from '.';
import config from '../../config/config';
import { calculateExpire } from '../../utils/caculateExpire.utils';

export const tokenRedis = {
    addAccessTokenToBackList: async (userId: string, accessToken: string) => {
        try {
            await redis.set(
                `access-token-blacklist:${userId}`,
                accessToken,
                'EX',
                calculateExpire(config.ACCESS_TOKEN_EXPIRES_IN)
            );

            console.log(await redis.get(`access-token-blacklist:${userId}`));
        } catch (error) {
            console.error('Error adding access token to blacklist:', error);
        }
    },

    checkAccessTokenInBlacklist: async (
        userId: string,
        accessToken: string
    ) => {
        try {
            const token = await redis.get(`access-token-blacklist:${userId}`);
            return token === accessToken;
        } catch (error) {
            console.error('Error checking access token in blacklist:', error);
        }
    },
};
