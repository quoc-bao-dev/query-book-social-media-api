import axios from 'axios';
import config from '../config/config';

class DeployService {
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
}

export default new DeployService();
