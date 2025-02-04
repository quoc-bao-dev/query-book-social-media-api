import roomChatSchema from '../models/roomChat.schema';
import { getUserById } from '../utils';

class RoomChatService {
    async getRoomChatByUserId(userId: string) {
        try {
            // Tìm các room chat mà userId nằm trong mảng members
            const roomChats = await roomChatSchema
                .find({ members: userId })
                .sort({
                    updatedAt: -1,
                });

            if (!roomChats || roomChats.length === 0) {
                return [];
            }

            // Lấy danh sách thành viên cho từng phòng chat
            const roomsWithMembers = await Promise.all(
                roomChats.map(async (room) => {
                    const members = await Promise.all(
                        room.members.map(async (memberId: string) => {
                            try {
                                return await getUserById(memberId);
                            } catch (error) {
                                console.error(
                                    `Lỗi khi lấy user ${memberId}:`,
                                    error
                                );
                                return null;
                            }
                        })
                    );

                    return {
                        ...room.toObject(), // Chuyển document Mongoose thành object thuần
                        members: members.filter(Boolean), // Lọc bỏ null nếu có lỗi
                    };
                })
            );

            return roomsWithMembers;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách room chat:', error);
            return [];
        }
    }

    async getRoomChatById(roomChatId: string) {
        try {
            const roomChat = await roomChatSchema.findById(roomChatId);
            if (!roomChat) return null; // Trả về null nếu không tìm thấy phòng chat

            // Lấy danh sách thành viên
            const members = await Promise.all(
                roomChat.members.map(async (memberId: string) => {
                    try {
                        return await getUserById(memberId);
                    } catch (error) {
                        console.error(`Lỗi khi lấy user ${memberId}:`, error);
                        return null; // Trả về null nếu lỗi
                    }
                })
            );

            // Lọc bỏ user `null` nếu có lỗi khi lấy dữ liệu

            const validMembers = members.filter(Boolean);

            return {
                ...roomChat.toObject(),
                members: validMembers,
            };
        } catch (error) {
            console.error('Lỗi khi lấy RoomChat:', error);
            return null; // Tránh lỗi ứng dụng
        }
    }

    async getRoomChatByFriendId(userId: string, friendId: string) {
        try {
            // Tìm phòng chat có cả userId và friendId trong members
            const roomChat = await roomChatSchema.findOne({
                members: { $all: [userId, friendId] },
            });

            if (!roomChat) {
                return null;
            }

            // Lấy thông tin chi tiết của các thành viên trong phòng chat
            const members = await Promise.all(
                roomChat.members.map(async (memberId: string) => {
                    try {
                        return await getUserById(memberId);
                    } catch (error) {
                        console.error(`Lỗi khi lấy user ${memberId}:`, error);
                        return null;
                    }
                })
            );

            return {
                ...roomChat.toObject(), // Chuyển document Mongoose thành object thuần
                members: members.filter(Boolean), // Lọc bỏ null nếu có lỗi
            };
        } catch (error) {
            console.error('Lỗi khi lấy phòng chat với bạn bè:', error);
            return null;
        }
    }

    async createRoomChat(data: any) {
        const payload = {
            name: data.name,
            members: data.members,
            isGroup: data.isGroup,
            groupAvatar: data.groupAvatar,
        };
        const roomChat = await roomChatSchema.create(payload);
        return roomChat;
    }
}

export default new RoomChatService();
