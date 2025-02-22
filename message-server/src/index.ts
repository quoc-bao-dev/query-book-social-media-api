import cors from 'cors';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import router from './routes';
import initializeSocket from './socket';

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3010;
const MONGO_URL =
    process.env.MONGO_DB_URL ?? 'mongodb://localhost:27017/message';

mongoose.connect(MONGO_URL).then(() => {
    console.log('Connect to MongoDB');
});

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'http://localhost:5173'],
        credentials: true,
        methods: ['GET', 'POST'],
    },
});
app.use(
    cors({
        origin: ['http://localhost:3000', 'http://localhost:5173'],
        credentials: true,
    })
);

initializeSocket(io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
