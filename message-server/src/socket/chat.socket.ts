import { Server, Socket } from 'socket.io';
import { getUser } from '../store/user';
import chatService from '../service/chat.service';
import roomChatService from '../service/roomChat.service';

const chatHandler = (socket: Socket, io: Server) => {
    socket.on('send_message', async (data) => {
        //TODO: save massage to database

        const payload = {
            senderId: data.senderId,
            roomChatId: data.groupId,
            content: data.message,
            images: data.images,
        };

        console.log(payload);

        await chatService.createMessage(payload);

        const lsRoomId = data.members
            .map((id) => getUser(id))
            .flatMap((set) => [...set]);

        io.to(lsRoomId).emit('receive_message', data);
        io.to(lsRoomId).emit('seen_message');
    });
    socket.on('typing', (data) => {
        const lsRoomId = data.members
            .map((id) => getUser(id))
            .flatMap((set) => [...set]);

        io.to(lsRoomId).emit('typing', data);
    });

    socket.on('seen_message', async (data) => {
        const { userId, roomChatId } = data;
        await roomChatService.seenMessage(userId, roomChatId);
        io.to([...getUser(userId)]).emit('seen_message');
    })
};
export default chatHandler;
