
const { env } = process

export const envConfig = {
    auth: {
        accessTokenSecret: env.ACCESS_TOKEN_SECRET,
        accessKey: {
            id: env.ACCESS_KEY_ID,
            secret: env.ACCESS_KEY_SECRET,
        },
    },
    aws: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
        region: env.AWS_REGION,
        s3: {
            bucket: env.AWS_S3_BUCKET,
        },
    },
    elasticSearch: {
        host: env.ELASTICSEARCH_HOST,
    },
    mysql: {
        host: env.MYSQL_HOST,
        port: env.MYSQL_PORT,
        database: env.MYSQL_DATABASE,
        user: env.MYSQL_USER,
        password: env.MYSQL_PASSWORD,
    },
    stripeConnectService: {
        baseUrl: env.SERVICE_STRIPE_CONNECT_BASE_URL,
        accessKeyId: env.SERVICE_STRIPE_CONNECT_ACCESS_KEY_ID,
        secretAccessKey: env.SERVICE_STRIPE_CONNECT_SECRET_ACCESS_KEY,
    },
    subscriptionsService: {
        baseUrl: env.SERVICE_SUBSCRIPTIONS_BASE_URL, // TODO: normalize
        accessKeyId: env.SERVICE_SUBSCRIPTIONS_ACCESS_KEY_ID, // TODO: normalize
        secretAccessKey: env.SERVICE_SUBSCRIPTIONS_SECRET_ACCESS_KEY, // TODO: normalize
    },
    subscriptionManagementService: {
        baseUrl: env.SUBSCRIPTION_MANAGEMENT_BASE_URL, // TODO: normalize
        accessKeyId: env.SUBSCRIPTION_MANAGEMENT_ACCESS_KEY_ID, // TODO: normalize
        secretAccessKey: env.SUBSCRIPTION_MANAGEMENT_SECRET_ACCESS_KEY, // TODO: normalize
    },
    identityService: {
        //baseUrl: env.SERVICE_IDENTITY_BASE_URL,
        //accessKeyId: env.SERVICE_IDENTITY_ACCESS_KEY_ID,
        //secretAccessKey: env.SERVICE_IDENTITY_ACCESS_KEY_SECRET,
    },
}
