import { Server, Socket } from 'socket.io';
import users, { addUser } from '../store/user';

const roomHandler = (socket: Socket, io: Server) => {
    socket.on('join_room', (roomId) => {
        socket.join(roomId);
        console.log(`${socket.id} joined room ${roomId}`);
        addUser(roomId, socket.id);
        socket.to(roomId).emit('user_joined', { userId: socket.id });
    });

    socket.on('leave_room', (roomId) => {
        socket.leave(roomId);
        console.log(`${socket.id} left room ${roomId}`);
        socket.to(roomId).emit('user_left', { userId: socket.id });
    });
};

export default roomHandler;
