import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { errorHandler } from './core';
import logMiddleware from './middlewares/logger.middleware';
import router from './router';
import { setupSwagger } from './openapi/swaggerConfig';
import path from 'path';

const app = express();

app.use(
    cors({
        origin: '*',
    })
);

app.use(logMiddleware);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupSwagger(app);

app.use('/api/v1/', router);

app.use(errorHandler);

export default app;
