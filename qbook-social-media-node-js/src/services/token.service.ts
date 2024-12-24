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
}

export default new TokenService();
