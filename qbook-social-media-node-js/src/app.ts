import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { errorHandler } from './core';
import logMiddleware from './middlewares/logger.middleware';
import { setupSwagger } from './openapi/swaggerConfig';
import router from './router';
import cookieParser from 'cookie-parser';
import fakeUser from './factory/fakeUser';
import fakePost from './factory/fakePost';
import config from './config/config';

const app = express();
app.use(morgan('dev'));

app.use(cookieParser());

const corsOrigins = config.CORS_ALLOWED_ORIGINS.split(',');
app.use(
    cors({
        origin: (origin, callback) => {
            console.log(origin);

            if (origin === undefined || corsOrigins.includes(origin)) {
                // Nếu origin là localhost với bất kỳ cổng nào
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    })
);

app.use(logMiddleware);
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
