import { Router } from 'express';
import StoryController from '../controllers/story.controller';
import { wrapAsync } from '../core';
import {
    authMiddleware,
    userIdMiddleware,
} from '../middlewares/authMiddleware';
const storyRouter = Router();

storyRouter.get('/', userIdMiddleware, wrapAsync(StoryController.getStories));

storyRouter.get(
    '/:id',
    userIdMiddleware,
    wrapAsync(StoryController.getStoryById)
);
storyRouter.post('/', authMiddleware, wrapAsync(StoryController.create));

export default storyRouter;
