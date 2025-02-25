import { faker } from '@faker-js/faker';
import { format } from 'date-fns';
import jobTitleSchema from '../models/jobTitle.schema';
import { MediaType } from '../models/types/media.type';
import { PostStatusType } from '../models/types/type';
import userProfileSchema from '../models/userProfile.schema';
import postService from '../services/post.service';
import userService from '../services/user.service';

const lsHashtag = [
    'react',
    'nodejs',
    'expressjs',
    'mongodb',
    'mongoose',
    'graphql',
    'apollo-server',
    'react-query',
    'nextjs',
    'typescript',
    'javascript',
    'query-book',
    'learn-on-query-book',
    'query-book-vietnam',
    'query-book-community',
    'query-book-for-beginner',
    'query-book-for-developer',
    'query-book-tutorial',
    'query-book-course',
    'query-book-books',
    'query-book-online-course',
    'query-book-youtube',
    'query-book-facebook-group',
    'query-book-discord',
    'query-book-slack',
];
export function generateHashtags(
    userName: string,
    predefinedHashtags: string[] = lsHashtag
) {
    // Tách tên người dùng thành các từ riêng biệt
    const nameParts = userName.split(' ');

    // Tạo mảng các hashtag từ tên người dùng
    const nameHashtags = [
        ...nameParts,
        userName.replace(' ', '-').toLowerCase(),
    ].map((part) => `${part.toLowerCase()}`);

    // Kết hợp các hashtag từ tên người dùng và các hashtag đã cho
    const allHashtags = [...nameHashtags, ...predefinedHashtags];

    // Trộn ngẫu nhiên các hashtag
    const shuffledHashtags = allHashtags.sort(() => Math.random() - 0.5);

    // Chọn ngẫu nhiên một số lượng hashtag nhất định (ví dụ: 3)
    const randNum = Math.round(Math.random() * 5);
    const selectedHashtags = shuffledHashtags.slice(0, randNum);

    return selectedHashtags;
}

const fakePost = async ({ userId }: { userId: string }) => {
    const user = await userService.findUserById(userId);
    const userProfile = await userProfileSchema.findOne({ userId });
    const jobTitle = await jobTitleSchema.findById(userProfile?.jobTitle);

    const ls = generateHashtags(user.firstName, lsHashtag);

    try {
        const dateTime = faker.date.between({
            from: new Date('2024-01-01'),
            to: new Date(),
        });
        console.log(dateTime);

        const date = format(dateTime, 'dd/MM/yyyy HH:mm:ss');
        const randomContent = faker.lorem.paragraphs(2); // Generates two random paragraphs
        const numberOfItems = Math.floor(Math.random() * 5) + 1; // Số lượng phần tử ngẫu nhiên từ 1 đến 10

        const media = Array.from({ length: numberOfItems }, () => ({
            sourceType: 'url',
            type: 'image' as MediaType,
            url: faker.image.urlLoremFlickr({
                height: 1000,
                width: 1000,
            }),
        }));

        const payload = {
            userId,
            content: `Hello world, I'm ${user.firstName} ${
                user.lastName
            }, my major is ${
                jobTitle?.title
            }.\n\n${randomContent}\n\n${date} \n${ls
                ?.map((i) => `#${i}`)
                .join(' ')}`,
            hashTags: ls,
            media: media,
            status: 'public' as PostStatusType,
            createdAt: dateTime,
            updatedAt: dateTime,
        };
        await postService.create(payload);
        console.log('fake post success');
    } catch (error) {
        console.log(error);
        console.log('fake post error');
        console.log('[hashTags]', ls);
    }
};

export default fakePost;
