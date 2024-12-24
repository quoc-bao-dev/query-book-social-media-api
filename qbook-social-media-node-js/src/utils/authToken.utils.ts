import config from '../config/config';
import { generateToken, verifyToken } from './jwt.utils';

export const genActiveAccountToken = (userId: string) => {
    return generateToken({ userId }, config.ACTIVE_ACCOUNT_SECRET, '15m');
};

export const genTowFAToken = (userId: string) => {
    return generateToken({ userId }, config.ACTIVE_ACCOUNT_SECRET, '5m');
};

export const genAccessToken = (userId: string) => {
    return generateToken(
        { userId },
        config.ACTIVE_ACCOUNT_SECRET,
        config.ACCESS_TOKEN_EXPIRES_IN
    );
};

export const genRefreshToken = (userId: string) => {
    return generateToken(
        { userId },
        config.ACTIVE_ACCOUNT_SECRET,
        config.REFRESH_TOKEN_EXPIRES_IN
    );
};

export const verifyAccessToken = (token: string) => {
    return verifyToken(token, config.ACTIVE_ACCOUNT_SECRET);
};

export const verifyRefreshToken = (token: string) => {
    return verifyToken(token, config.ACTIVE_ACCOUNT_SECRET);
};

export const verifyActiveAccountToken = (token: string) => {
    return verifyToken(token, config.ACTIVE_ACCOUNT_SECRET);
};

export const verifyTowFAToken = (token: string) => {
    return verifyToken(token, config.ACTIVE_ACCOUNT_SECRET);
};
