import { Server, Socket } from 'socket.io';
import { addUser } from '../store/user';

const initializeSocket = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        const roomId = socket.id;
        const userId = socket.handshake.query.userId as string;

        if (!userId) {
            socket.emit('error', 'User ID is required');
            socket.disconnect();
            return;
        }

        if (!roomId) {
            socket.emit('error', 'Room ID is required');
            socket.disconnect();
            return;
        }

        addUser(userId, roomId);
        socket.join(roomId);
        console.log(`✅ [${userId}] joined room ${roomId}`);

        socket.on('disconnect', () => {
            console.log(`❌ [${userId}] left room ${roomId}`);
            socket.leave(roomId);
        });

        // chatHandler(socket, io);
    });
};

export default initializeSocket;
