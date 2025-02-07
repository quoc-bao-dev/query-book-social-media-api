import fs from 'fs';
import mongoose from 'mongoose';
import app from './app';
import config from './config/config';
import redis from './libs/redis';

// Đọc chứng chỉ SSL
const privateKey = fs.readFileSync('certs/localhost-key.pem', 'utf8');
const certificate = fs.readFileSync('certs/localhost.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

mongoose
    .connect(config.MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
        console.log('Failed to connect to MongoDB');
        process.exit(1);
    });

redis.on('connect', () => {
    console.log('Connected to Redis');
});

redis.on('error', (err) => {
    console.error('Redis connection error:', err);
});

app.listen(config.PORT, () => {
    console.log(
        `Server running on port ${config.PORT}, http://localhost:${config.PORT}`
    );
});

// https.createServer(credentials, app).listen(config.PORT, () => {
//     console.log(
//         `Server running on port ${config.PORT}, https://localhost:${config.PORT}`
//     );
// });
