import { Server, Socket } from 'socket.io';
import { io } from '..';
import { getUser } from '../store/user';

const followSocketHandler = (socket: Socket, io: Server) => {};

export const followSocket = (targetId: string) => {
    const room = getUser(targetId);

    return {
        follow: (data: any) => {
            const lsRoom = [...room, '1'];
            io.to(lsRoom).emit('receive_follow', data);
        },
    };
};

export default followSocketHandler;
