import { UserDocument } from '../model/user.schema';

export class UserDTO {
    username: string;
    email: string;
    password: string;
    constructor(payload: UserDocument) {
        this.username = payload.username;
        this.email = payload.email;
        this.password = payload.password;
    }
}
