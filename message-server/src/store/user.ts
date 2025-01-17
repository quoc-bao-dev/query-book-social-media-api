const users = new Map<string, Set<string>>();

const addUser = (userId: string, socketId: string) => {
    if (users.has(userId)) {
        users.get(userId)!.add(socketId);
    } else {
        users.set(userId, new Set([socketId]));
    }
};

const removeUser = (userId: string, socketId: string) => {
    if (users.has(userId)) {
        users.get(userId)!.delete(socketId);

        if (users.get(userId)!.size === 0) {
            users.delete(userId);
        }
    }
};

const getUser = (userId: string) => {
    return users.get(userId) ?? new Set();
};

const getAllUsers = () => {
    return Array.from(users.values()).flat();
};

export { addUser, removeUser, getUser, getAllUsers };

export default users;
