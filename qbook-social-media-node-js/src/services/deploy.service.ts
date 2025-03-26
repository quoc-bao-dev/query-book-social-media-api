import axios from 'axios';
import config from '../config/config';

class DeployService {
    async getHostingByUserId(userId: string) {
        try {
            const data = await axios.get(
                `${config.DEPLOY_SERVER}/get-hostings/${userId}`,
                {
                    headers: {
                        'x-api-key': config.DEPLOY_API_KEY,
                    },
                }
            );
            data.data.data = data.data.data.map((item: any) => {
                return {
                    userId: item.userId,
                    subDomain: item.subdomain,
                    url: item.url,
                };
            });
            return data.data;
        } catch (error) {
            throw (error as any)?.response.data;
        }
    }
    async upload(payload: any) {
        const formData = new FormData();
        const file = new Blob([payload.file.buffer], {
            type: payload.file.mimetype,
        });
        formData.append('file', file, payload.file.originalname);
        formData.append('subDomain', payload.subDomain);
        formData.append('userId', payload.userId);

        try {
            const res = await axios.post(
                `${config.DEPLOY_SERVER}/upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'x-api-key': config.DEPLOY_API_KEY,
                    },
                }
            );

            return res.data;
        } catch (error) {
            throw (error as any)?.response.data;
        }
    }

    async createHosting(payload: any) {
        console.log(11111);

        const subDomain = payload.subDomain;
        const userId = payload.userId;
        try {
            console.log(config.DEPLOY_SERVER);
            console.log(config.DEPLOY_API_KEY);

            const data = await axios.post(
                `${config.DEPLOY_SERVER}/create-hosting`,
                { subDomain, userId },
                {
                    headers: {
                        'x-api-key': config.DEPLOY_API_KEY,
                    },
                }
            );

            console.log(2222);

            return data.data;
        } catch (error) {
            console.log(3333);

            console.log(error);
            return;
            // throw (error as any)?.response.data;
        }
    }

    async delete(payload: any) {
        const subDomain = payload.subDomain;
        const userId = payload.userId;
        try {
            const data = await axios.delete(
                `${config.DEPLOY_SERVER}/delete-hosting/${subDomain}`,
                {
                    headers: {
                        'x-api-key': config.DEPLOY_API_KEY,
                    },
                    data: {
                        userId,
                    },
                }
            );
            return data.data;
        } catch (error) {
            throw (error as any)?.response.data;
        }
    }
}

export default new DeployService();
