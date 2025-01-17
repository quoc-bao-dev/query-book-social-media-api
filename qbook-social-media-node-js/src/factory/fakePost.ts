import { format } from 'date-fns';
import { PostStatusType } from '../models/types/type';
import postService from '../services/post.service';
import userService from '../services/user.service';
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
    for (let i = 0; i < quantity; i++) {
        const date = format(new Date(), 'dd/MM/yyyy HH:mm:ss');
        postService.create({
            userId,
            content: `Hello world, I'm ${user.username}, ${date}`,
            hashTags: hashTags || [],
            status,
            media: [],
        });
    }
};

export default fakePost;
