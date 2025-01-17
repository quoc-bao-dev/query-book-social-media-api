import { Server, Socket } from 'socket.io';

const chatHandler = (socket: Socket, io: Server) => {
    socket.on('send_message', (data) => {
        //TODO: save massage to database
        io.emit('receive_message', data);
    });
};
export default chatHandler;
