const config = {
    PORT: process.env.PORT || 3000,
    PORT_REDIS: (process.env.PORT_REDIS || 6379) as number,
    HOST_REDIS: (process.env.HOST_REDIS || 'localhost') as string,

    MONGO_URL: process.env.MONGO_URL as string,

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
    ACTIVE_ACCOUNT_SECRET: process.env.ACTIVE_ACCOUNT_SECRET as string,

    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN as string,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN as string,
    ACTIVE_ACCOUNT_EXPIRES_IN: process.env.ACTIVE_ACCOUNT_EXPIRES_IN as string,

    EMAIL_USER: process.env.EMAIL_USER as string,
    EMAIL_PASS: process.env.EMAIL_PASS as string,
};

if (!config.MONGO_URL) {
    console.error('[ERROR]: MONGO_URL is not set');
    process.exit(0);
}

export default config;
