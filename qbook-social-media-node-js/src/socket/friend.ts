import { Server, Socket } from 'socket.io';
import { io } from '..';
import { getUser } from '../store/user';

const friendSocketHandler = (socket: Socket, io: Server) => {};

export const friendSocket = (targetId: string) => {
    const room = getUser(targetId);
    return {
        sendRequest: (data: any) => {
            io.to([...room, '1']).emit('receive_friend_request', data);
        },
        acceptRequest: (data: any) => {
            io.to([...room, '1']).emit('accept_friend_request', data);
        },
    };
};

export default friendSocketHandler;
