import { Server, Socket } from 'socket.io';
import { addUser, removeUser } from '../store/user';
import chatHandler from './chat.socket';

const initializeSocket = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log(`User connected: ${socket.id}`);

        const userId = socket.handshake.query.userId as string;
        const roomId = socket.id;
        if (userId) {
            addUser(userId, roomId);
            socket.join(roomId);
        }

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
            if (userId) {
                removeUser(userId, roomId);
                socket.leave(roomId);
            }
        });

        chatHandler(socket, io);
    });
};

export default initializeSocket;
