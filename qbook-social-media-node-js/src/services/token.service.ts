import config from '../config/config';
import RefreshToken from '../models/refreshToken.schema';
import { calculateExpire } from '../utils/caculateExpire.utils';
class TokenService {
    async addRefreshToken(userId: string, refreshToken: string) {
        const expiresAt = new Date(
            calculateExpire(config.REFRESH_TOKEN_EXPIRES_IN)
        );
        return await RefreshToken.create({ userId, refreshToken, expiresAt });
    }

    async deleteRefreshToken(userId: string, refreshToken: string) {
        return await RefreshToken.deleteOne({ userId, refreshToken });
    }

    async deleteAllRefreshToken(userId: string) {
        return await RefreshToken.deleteMany({ userId });
    }

    async verifyRefreshToken(userId: string, refreshToken: string) {
        const token = await RefreshToken.findOne({ refreshToken, userId });

        if (!token) {
            return false;
        }

        return true;
    }
}

export default new TokenService();
