import { faker } from '@faker-js/faker';
import jobTitleSchema from '../models/jobTitle.schema';
import User from '../models/user.schema';
import UserProfile from '../models/userProfile.schema';
import userService from '../services/user.service';
import { hashPassword } from '../utils/bcrypt.utils';
import { toHandleName } from '../utils/convertString';
import fakePost from './fakePost';

const fakeUser = async () => {
    // Array of full names
    const fullNames = [
        'John Doe',
        'Jane Smith',
        'Michael Johnson',
        'Emily Davis',
        'David Brown',
        'Sarah Wilson',
        'James Taylor',
        'Mary Anderson',
        'Robert Thomas',
        'Linda Jackson',
        'William White',
        'Elizabeth Harris',
        'Joseph Martin',
        'Susan Thompson',
        'Charles Garcia',
        'Jessica Martinez',
        'Thomas Robinson',
        'Dorothy Clark',
        'Daniel Lewis',
        'Helen Walker',
    ];

    // Select a random full name from the array
    const randomName = fullNames[Math.floor(Math.random() * fullNames.length)];
    const [firstName, lastName] = randomName.split(' ');

    // Fetch job titles from the database
    const jobTitles = await jobTitleSchema.find();

    // Select a random job title
    const jobTitleIndex = Math.floor(Math.random() * jobTitles.length);

    const { _id: jobTitleId, title } = jobTitles[jobTitleIndex];

    // Generate random values
    const rand = Math.round(Math.random() * 10000);
    const password = await hashPassword('password1234');
    const handleName = toHandleName(`faker${rand}`);
    const email = `user${rand}@gmail.com`;
    const username = `user${rand}`;

    // Create the user
    const user = await User.create({
        firstName,
        lastName,
        handle: handleName,
        email,
        username,
        password,
        isActive: true,
        role: 'user',
    });

    // Create the user profile
    const userProfile = await UserProfile.create({
        userId: user.id,
        jobTitle: jobTitleId,
    });

    user.professional = title;
    await user.save();

    userService.updateUser(user.id, {
        avatar: {
            type: 'image',
            sourceType: 'url',
            url: faker.image.avatar(),
        },
    });

    // Create post for User
    const post = await fakePost({
        quantity: Math.round(Math.random() * 10) + 2,
        status: 'public',
        userId: user.id,
    });

    return { user, userProfile };
};

export default fakeUser;
