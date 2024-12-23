import jwt from 'jsonwebtoken';

// Sinh token
export const generateToken = (
    payload: object,
    secret: string,
    expiresIn: string
) => {
    return jwt.sign(payload, secret, { expiresIn });
};

// Giải mã token
export const verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret);
};

// Kiểm tra xem token có hợp lệ không
export const isTokenValid = (token: string, secret: string): boolean => {
    try {
        jwt.verify(token, secret);
        return true;
    } catch (error) {
        return false;
    }
};
