import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import config from './config/config';
import { errorHandler } from './core';
import logMiddleware from './middlewares/logger.middleware';
import { setupSwagger } from './openapi/swaggerConfig';
import router from './router';

const app = express();
app.use(morgan('dev'));

app.use(cookieParser());

const corsOrigins = config.CORS_ALLOWED_ORIGINS.split(',');
app.use(
    cors({
        origin: (origin, callback) => {
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

app.use(errorHandler);

export default app;
