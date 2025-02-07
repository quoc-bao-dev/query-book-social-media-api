import { Server, Socket } from 'socket.io';
import { getUser } from '../store/user';
import chatService from '../service/chat.service';

const chatHandler = (socket: Socket, io: Server) => {
    socket.on('send_message', async (data) => {
        //TODO: save massage to database

        const payload = {
            senderId: data.senderId,
            roomChatId: data.groupId,
            content: data.message,
        };

        await chatService.createMessage(payload);

        const lsRoomId = data.members
            .map((id) => getUser(id))
            .flatMap((set) => [...set]);

        io.to(lsRoomId).emit('receive_message', data);
    });
    socket.on('typing', (data) => {
        const lsRoomId = data.members
            .map((id) => getUser(id))
            .flatMap((set) => [...set]);

        io.to(lsRoomId).emit('typing', data);
    });
};
export default chatHandler;
