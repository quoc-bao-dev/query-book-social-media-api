import User from '../models/user.schema';
import UserProfile from '../models/userProfile.schema';
import { hashPassword } from '../utils/bcrypt.utils';
import { toHandleName } from '../utils/convertString';
const fakeUser = async () => {
    const rand = Math.round(Math.random() * 10000);
    const password = await hashPassword('password1234');
    const handleName = toHandleName(`faker ${rand}`);
    const email = `user${rand}@gmail.com`;
    const username = `user${rand}`;
    const user = await User.create({
        firstName: 'John',
        lastName: 'Doe',
        handle: handleName,
        email: email,
        username,
        password,
        isActive: true,
        role: 'user',
    });

    const userProfile = await UserProfile.create({
        userId: user.id,
    });

    return { user, userProfile };
};

export default fakeUser;
