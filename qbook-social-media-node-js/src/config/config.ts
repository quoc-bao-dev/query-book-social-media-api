const config = {
    PORT: process.env.PORT || 3000,
    MONGO_URL: process.env.MONGO_URL as string,
};

if (!config.MONGO_URL) {
    console.error('[ERROR]: MONGO_URL is not set');
    process.exit(0);
}

export default config;
