import { Router } from 'express';
import TopicController from '../controllers/topic.controller';
import { wrapAsync } from '../core';

const topicRouter = Router();

topicRouter.get('/', wrapAsync(TopicController.getAll));
topicRouter.post('/', wrapAsync(TopicController.create));

export default topicRouter;
