import { Server, Socket } from 'socket.io';
import { getUser } from '../store/user';

const chatHandler = (socket: Socket, io: Server) => {
    socket.on('send_message', (data) => {
        //TODO: save massage to database
        console.log(data);
        const lsRoomId = data.members
            .map((id) => getUser(id))
            .flatMap((set) => [...set]);
        console.log(lsRoomId);

        lsRoomId.forEach((roomId) => {
            io.to(roomId).emit('receive_message', data);
        });
    });
};
export default chatHandler;
