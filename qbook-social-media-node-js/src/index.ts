import mongoose from 'mongoose';
import app from './app';
import config from './config/config';

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

app.listen(config.PORT, () => {
    console.log(
        `Server running on port ${config.PORT}, http://localhost:${config.PORT}`
    );
});
