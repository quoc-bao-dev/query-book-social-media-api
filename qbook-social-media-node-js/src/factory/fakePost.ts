import { faker } from '@faker-js/faker';
import { format } from 'date-fns';
import jobTitleSchema from '../models/jobTitle.schema';
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
function generateHashtags(userName: string, predefinedHashtags: string[] = []) {
    // Tách tên người dùng thành các từ riêng biệt
    const nameParts = userName.split(' ');

    // Tạo mảng các hashtag từ tên người dùng
    const nameHashtags = nameParts.map((part) => `${part.toLowerCase()}`);

    // Kết hợp các hashtag từ tên người dùng và các hashtag đã cho
    const allHashtags = [...nameHashtags, ...predefinedHashtags];

    // Trộn ngẫu nhiên các hashtag
    const shuffledHashtags = allHashtags.sort(() => Math.random() - 0.5);

    // Chọn ngẫu nhiên một số lượng hashtag nhất định (ví dụ: 3)
    const selectedHashtags = shuffledHashtags.slice(0, 3);

    return selectedHashtags;
}

const fakePost = async ({
    userId,
    quantity,
    status,
    hashTags,
}: {
    userId: string;
    quantity: number;
    status: PostStatusType;
    hashTags?: string[];
}) => {
    const user = await userService.findUserById(userId);
    const userProfile = await userProfileSchema.findOne({ userId });
    const jobTitle = await jobTitleSchema.findById(userProfile?.jobTitle);

    for (let i = 0; i < quantity; i++) {
        const date = format(new Date(), 'dd/MM/yyyy HH:mm:ss');
        const randomContent = faker.lorem.paragraphs(2); // Generates two random paragraphs

        const ls = generateHashtags(user.firstName, lsHashtag);

        const numberOfItems = Math.floor(Math.random() * 10) + 1; // Số lượng phần tử ngẫu nhiên từ 1 đến 10

        const media = Array.from({ length: numberOfItems }, () => ({
            sourceType: 'url',
            type: 'image',
            url: faker.image.urlLoremFlickr({ height: 1000, width: 1000 }),
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
            status,
            media: media,
        };

        postService.create(payload);
    }
};

export default fakePost;
