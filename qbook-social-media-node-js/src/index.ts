import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import app from './app';
import config from './config/config';
import redis from './libs/redis';
import initializeSocket from './socket';

mongoose
    .connect(config.MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
        console.log('Failed to connect to MongoDB');
        process.exit(1);
    });

redis.on('connect', () => {
    console.log('Connected to Redis');
});

redis.on('error', (err) => {
    console.error('Redis connection error:', err);
});

const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'http://localhost:5173'],
        credentials: true,
        methods: ['GET', 'POST'],
    },
});

initializeSocket(io);

server.listen(config.PORT, () => {
    console.log(
        `Server running on port ${config.PORT}, http://localhost:${config.PORT}`
    );
});
