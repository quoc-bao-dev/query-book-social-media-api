import axios from 'axios';
import { config } from '../config';
export const getUserById = (userId: string) => {
    return axios
        .get(`${config.BASE_URL}/users/profile/${userId}`)
        .then((res) => {
            return res.data.data;
        });
};
