import redis from '.';
import config from '../../config/config';
import { calculateExpire } from '../../utils/caculateExpire.utils';

export const tokenRedis = {
    addAccessTokenToBackList: async (accessToken: string) => {
        try {
            await redis.set(
                'access-token-blacklist',
                accessToken,
                'EX',
                calculateExpire(config.ACCESS_TOKEN_EXPIRES_IN)
            );
        } catch (error) {
            console.error('Error adding access token to blacklist:', error);
        }
    },
};
