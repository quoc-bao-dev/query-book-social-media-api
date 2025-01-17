import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { errorHandler } from './core';
import logMiddleware from './middlewares/logger.middleware';
import { setupSwagger } from './openapi/swaggerConfig';
import router from './router';
import fakeUser from './factory/fakeUser';
import fakePost from './factory/fakePost';

const app = express();

app.use(
    cors({
        origin: '*',
        allowedHeaders: ['Authorization', 'Content-Type'],
    })
);

app.use(logMiddleware);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupSwagger(app);

app.use('/api/v1/', router);

// fakeUser();
// fakePost({
//     userId: '676e7a3017c3b35dcced3084',
//     quantity: 10,
//     status: 'private',
//     hashTags: ['react', 'angular'],
// });
app.use(errorHandler);

export default app;
