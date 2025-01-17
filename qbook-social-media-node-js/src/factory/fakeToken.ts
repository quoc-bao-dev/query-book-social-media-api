import { genAccessToken } from '../utils/authToken.utils';

export function fakeToken(userId: string) {
    const token = genAccessToken(userId);
    console.log(token);
}
