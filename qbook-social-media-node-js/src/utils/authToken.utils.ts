import config from '../config/config';
import { generateToken, verifyToken } from './jwt.utils';

// access token
export const genAccessToken = (userId: string) => {
    return generateToken(
        { userId },
        config.ACTIVE_ACCOUNT_SECRET,
        config.ACCESS_TOKEN_EXPIRES_IN
    );
};

export const verifyAccessToken = (token: string) => {
    return verifyToken(token, config.ACTIVE_ACCOUNT_SECRET);
};

// refresh token
export const genRefreshToken = (userId: string) => {
    return generateToken(
        { userId },
        config.ACTIVE_ACCOUNT_SECRET,
        config.REFRESH_TOKEN_EXPIRES_IN
    );
};

export const verifyRefreshToken = (token: string) => {
    return verifyToken(token, config.ACTIVE_ACCOUNT_SECRET);
};

// active token
export const genActiveAccountToken = (userId: string) => {
    return generateToken({ userId }, config.ACTIVE_ACCOUNT_SECRET, '15m');
};

export const verifyActiveAccountToken = (token: string) => {
    return verifyToken(token, config.ACTIVE_ACCOUNT_SECRET);
};

// 2fa token
export const genTowFAToken = (userId: string) => {
    return generateToken({ userId }, config.ACTIVE_ACCOUNT_SECRET, '5m');
};

export const verifyTowFAToken = (token: string) => {
    return verifyToken(token, config.ACTIVE_ACCOUNT_SECRET);
};

// reset password token
export const genResetPasswordToken = (userId: string) => {
    return generateToken({ userId }, config.ACTIVE_ACCOUNT_SECRET, '5m');
};

export const verifyResetPasswordToken = (token: string) => {
    return verifyToken(token, config.ACTIVE_ACCOUNT_SECRET);
};

//admin token
export const genAdminAccessToken = ({
    adminId,
    role,
}: {
    adminId: string;
    role: string;
}) => {
    return generateToken(
        { adminId, role },
        config.ADMIN_ACCESS_TOKEN_SECRET,
        config.ACCESS_TOKEN_EXPIRES_IN
    );
};

export const verifyAdminAccessToken = (token: string) => {
    return verifyToken(token, config.ADMIN_ACCESS_TOKEN_SECRET);
};
