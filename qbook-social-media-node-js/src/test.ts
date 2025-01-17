import { fakeToken } from './factory/fakeToken';
import { hashPassword } from './utils/bcrypt.utils';

const user1 = '676e17a7befb1214cb0c6bf1';
const user2 = '676e7a3017c3b35dcced3084';
const user3 = '676e7a29916c5a44cfaefac2';
const main = async () => {
    fakeToken(user1);
};

main();
