
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
