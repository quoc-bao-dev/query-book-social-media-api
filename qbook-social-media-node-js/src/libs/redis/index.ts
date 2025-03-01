import Redis from 'ioredis';
import config from '../../config/config';

const redis = new Redis({
    host: config.HOST_REDIS, // Địa chỉ Redis server
    port: config.PORT_REDIS, // Cổng Redis (mặc định là 6379)
    password: config.PASS_REDIS, // Nếu Redis có yêu cầu mật khẩu
    name: config.NAME_REDIS,
});

export default redis;
