import { Server, Socket } from 'socket.io';
import roomHandler from './room.socket';

const initializeSocket = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
        roomHandler(socket, io);
    });
};

export default initializeSocket;
