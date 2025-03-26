import axios from 'axios';
import config from '../config/config';
import ApiError from '../core/ApiError';
import userSchema from '../models/user.schema';
import { genAccessToken, genRefreshToken } from '../utils/authToken.utils';
import mediaSchema from '../models/media.schema';
import userProfileSchema from '../models/userProfile.schema';

class oauthService {
    async googleLogin(code: string) {
        const data = await this.getGoogleToken(code);

        const userInfo = await this.getGoogleUserInfo(
            data.id_token,
            data.access_token
        );

        if (!userInfo.verified_email) {
            throw ApiError.badRequest('Email not verified');
        }

        const user = await userSchema.findOne({ email: userInfo.email });
        if (!user) {
            //TODO: create new user

            const newUser = await this.createNewUser(userInfo);
            const accessToken = genAccessToken(newUser._id.toString());
            const refreshToken = genRefreshToken(newUser._id.toString());
            return {
                isNew: true,
                accessToken,
                refreshToken,
            };
        } else {
            const accessToken = genAccessToken(user._id.toString());
            const refreshToken = genRefreshToken(user._id.toString());
            return { isNew: false, accessToken, refreshToken };
        }
    }

    private async getGoogleToken(code: string) {
        const response = await axios.post(
            'https://oauth2.googleapis.com/token',
            {
                code,
                client_id: config.GOOGLE_CLIENT_ID,
                client_secret: config.GOOGLE_CLIENT_SECRET,
                redirect_uri: config.GOOGLE_REDIRECT_URI,
                grant_type: 'authorization_code',
            }
        );
        return response.data;
    }

    private async getGoogleUserInfo(id_token: string, access_token: string) {
        const response = await axios.get(
            'https://www.googleapis.com/oauth2/v2/userinfo',
            {
                params: {
                    access_token,
                    alt: 'json',
                },
                headers: {
                    Authorization: `Bearer ${id_token}`,
                },
            }
        );
        return response.data;
    }

    private async createNewUser(userInfo: any) {
        const avatar = await mediaSchema.create({
            url: userInfo.picture,
            type: 'image',
            sourceType: 'url',
        });
        const randDomPassword = Math.random().toString(36).slice(-8);
        const user = await userSchema.create({
            username: userInfo.name,
            password: randDomPassword,
            email: userInfo.email,
            avatar: avatar._id,
            isActive: true,
            handle: userInfo.name,
            firstName: userInfo.given_name,
            lastName: userInfo.family_name,
            oauthProvider: 'google',
        });
        await userProfileSchema.create({
            userId: user._id,
        });

        return user;
    }
}

export default new oauthService();

// {
//   id: "113688517068412088896",
//   email: "quocbaodev1102@gmail.com",
//   verified_email: true,
//   name: "Quoc Bao Truong",
//   given_name: "Quoc Bao",
//   family_name: "Truong",
//   picture: "https://lh3.googleusercontent.com/a/ACg8ocJp_inAKbDYtwvPSv_FArY7i_rc4pOxGOQwq9E7gToFHMRTRA=s96-c",
// }
