import Redis from 'ioredis';
import config from '../../config/config';

const redis = new Redis({
    host: config.HOST_REDIS, // Địa chỉ Redis server
    port: config.PORT_REDIS, // Cổng Redis (mặc định là 6379)
    // password: 'your_password', // Nếu Redis có yêu cầu mật khẩu
});

export default redis;
