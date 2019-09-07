
export const errorCodes = {
    auth: {
        unknownAuthorizationHeader: 401201,
    },
    registration: {
        usernameInUse: 409301,
        emailInUse: 409302,
    },
    credentials: {
        invalidEmailOrUsername: 400401,
    },
    paymentsErrors: {
        defaultSourceMissing: 404501,
    },
    core: {
        imageNotFound: 700101,
    },
    library: {
        activityNotFound: 404601,
    },
    lms: {
        forbiddenLMSContextMembership: 600101,
    },
}
