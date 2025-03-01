import { faker } from '@faker-js/faker';
import jobTitleSchema from '../models/jobTitle.schema';
import User from '../models/user.schema';
import UserProfile from '../models/userProfile.schema';
import userService from '../services/user.service';
import { hashPassword } from '../utils/bcrypt.utils';
import { toHandleName } from '../utils/convertString';
import fakePost from './fakePost';

const fullNames = [
    'Christopher Hall',
    'Patricia Allen',
    'Matthew Young',
    'Barbara King',
    'Anthony Wright',
    'Jennifer Scott',
    'Joshua Green',
    'Nancy Adams',
    'Andrew Baker',
    'Sandra Nelson',
    'Ryan Carter',
    'Ashley Mitchell',
    'Brandon Perez',
    'Kimberly Roberts',
    'Kevin Turner',
    'Michelle Phillips',
    'Justin Campbell',
    'Deborah Evans',
    'Stephen Parker',
    'Laura Edwards',
    'Eric Collins',
    'Amanda Stewart',
    'Benjamin Morris',
    'Melissa Rogers',
    'Samuel Reed',
    'Rebecca Cook',
    'Timothy Bell',
    'Stephanie Murphy',
    'Alexander Cooper',
    'Donna Bailey',
    'Nicholas Rivera',
    'Carol Gomez',
    'Jonathan Howard',
    'Cynthia Bryant',
    'Frank Ward',
    'Angela Torres',
    'Patrick Peterson',
    'Kathleen Gray',
    'Raymond Watson',
    'Sharon Brooks',
    'Jack Sanders',
    'Diane Price',
    'Henry Bennett',
    'Christine Wood',
    'Walter Barnes',
    'Rachel Ross',
    'Dennis Henderson',
    'Janet Coleman',
    'Peter Jenkins',
    'Maria Perry',
];
const fakeUser = async () => {
    try {
        const randomName =
            fullNames[Math.floor(Math.random() * fullNames.length)];
        const [firstName, lastName] = randomName.split(' ');

        // Fetch job titles from the database
        const jobTitles = await jobTitleSchema.find();

        // Select a random job title
        const jobTitleIndex = Math.floor(Math.random() * jobTitles.length);

        const { _id: jobTitleId, title } = jobTitles[jobTitleIndex];

        // Generate random values
        const rand = Math.round(Math.random() * 100000);
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
            professional: title,
        });

        // Create the user profile
        const userProfile = await UserProfile.create({
            userId: user.id,
            jobTitle: jobTitleId,
            bio: faker.person.bio(),
        });

        userService.updateUser(user.id, {
            avatar: {
                type: 'image',
                sourceType: 'url',
                url: faker.image.avatar(),
            },
        });

        const randNumPost = Math.floor(Math.random() * 5) + 1;

        for (let i = 0; i < randNumPost; i++) {
            await fakePost({ userId: user.id });
        }

        console.log('create user success');
    } catch (error) {
        console.log(error);
        console.log('create user fail');
    }
};

export default fakeUser;
