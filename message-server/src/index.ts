import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import initializeSocket from './socket';

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
const MONGO_URL =
    process.env.MONGO_DB_URL ?? 'mongodb://localhost:27017/message';

mongoose.connect(MONGO_URL).then(() => {
    console.log('Connect to massage server');
});

const io = new Server(server, {
    cors: {
        origin: '*', // Điều chỉnh theo domain của bạn
        methods: ['GET', 'POST'],
    },
});

initializeSocket(io);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
