const config = {
    PORT: process.env.PORT || 3000,
    PORT_REDIS: (process.env.PORT_REDIS || 6379) as number,
    HOST_REDIS: (process.env.HOST_REDIS || 'localhost') as string,

    MONGO_URL: process.env.MONGO_URL as string,

    ADMIN_ACCESS_TOKEN_SECRET: process.env.ADMIN_ACCESS_TOKEN_SECRET as string,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
    ACTIVE_ACCOUNT_SECRET: process.env.ACTIVE_ACCOUNT_SECRET as string,

    ADMIN_ACCESS_TOKEN_EXPIRES_IN: process.env
        .ADMIN_ACCESS_TOKEN_EXPIRES_IN as string,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN as string,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN as string,
    ACTIVE_ACCOUNT_EXPIRES_IN: process.env.ACTIVE_ACCOUNT_EXPIRES_IN as string,

    IMAGE_SERVER: process.env.IMAGE_SERVER as string,

    DEPLOY_SERVER: process.env.DEPLOY_SERVER as string,
    DEPLOY_API_KEY: process.env.DEPLOY_API_KEY as string,

    EMAIL_USER: process.env.EMAIL_USER as string,
    EMAIL_PASS: process.env.EMAIL_PASS as string,

    CORS_ALLOWED_ORIGINS: process.env.CORS_ALLOWED_ORIGINS as string,

    STRIPE_PAYMENT_SECRET_KEY: process.env.STRIPE_PAYMENT_SECRET_KEY as string,
};

if (!config.MONGO_URL) {
    console.error('[ERROR]: MONGO_URL is not set');
    process.exit(0);
}

export default config;
