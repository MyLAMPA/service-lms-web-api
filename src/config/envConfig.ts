
const { env } = process

export const envConfig = {
    aws: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
        region: env.AWS_REGION,
    },
    subscriptionManagementService: {
        baseUrl: env.SUBSCRIPTION_MANAGEMENT_BASE_URL,
        accessKeyId: env.SUBSCRIPTION_MANAGEMENT_ACCESS_KEY_ID,
        secretAccessKey: env.SUBSCRIPTION_MANAGEMENT_SECRET_ACCESS_KEY,
    },
    identityService: {
        baseUrl: env.IDENTITY_BASE_URL,
        accessKeyId: env.IDENTITY_ACCESS_KEY_ID,
        secretAccessKey: env.IDENTITY_SECRET_ACCESS_KEY,
    },
}
