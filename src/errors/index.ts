
export { JsonError } from './httpErrors/JsonError'
import { BadRequestError } from './httpErrors/BadRequestError'
import { ForbiddenError } from './httpErrors/ForbiddenError'
import { NotFoundError } from './httpErrors/NotFoundError'
import { UnauthorizedError } from './httpErrors/UnauthorizedError'
import { ServerError } from './httpErrors/ServerError'
import { BadGatewayError } from './httpErrors/BadGatewayError'
import { ConflictError } from './httpErrors/ConflictError'
import { UnprocessableEntityError } from './httpErrors/UnprocessableEntityError'
import { errorCodes } from './errorCodes'

export const httpErrors = {
    badRequest: (message: string = 'Bad Request', errorCode: number = null): BadRequestError =>
        new BadRequestError(message, errorCode),

    conflict: (message: string = 'Conflict', errorCode: number = null): ConflictError =>
        new ConflictError(message, errorCode),

    forbidden: (message: string = 'Forbidden', errorCode: number = null): ForbiddenError =>
        new ForbiddenError(message, errorCode),

    notFound: (message: string = 'Not Found', errorCode: number = null): NotFoundError =>
        new NotFoundError(message, errorCode),

    unauthorized: (message: string = 'Unauthorized', errorCode: number = null): UnauthorizedError =>
        new UnauthorizedError(message, errorCode),

    serverError: (message: string = 'Server Error', errorCode: number = null): ServerError =>
        new ServerError(message, errorCode),

    badGateway: (message: string = 'Bad Gateway', errorCode: number = null): BadGatewayError =>
        new BadGatewayError(message, errorCode),

    unprocessableEntityError: (message: string = 'Unprocessable Entity', errorCode: number = null): UnprocessableEntityError =>
        new UnprocessableEntityError(message, errorCode),
}

export const authErrors = {
    unknownAuthorizationHeader: (): UnauthorizedError =>
        httpErrors.unauthorized('Unknown Authorization Header - Bearer Credentials Required: "Bearer <credentials>"'),
    virtualUnauthorized: (): UnauthorizedError =>
        httpErrors.unauthorized('Unauthorized Request'),
}

export const registrationErrors = {
    usernameInUse: (): ConflictError =>
        httpErrors.conflict('Username Already In Use', errorCodes.registration.usernameInUse),

    emailInUse: (): ConflictError =>
        httpErrors.conflict('Email Already In Use', errorCodes.registration.emailInUse),
}

export const credentialsErrors = {
    invalidEmailOrUsername: (): BadRequestError =>
        httpErrors.badRequest('Invalid Email Or Username', errorCodes.credentials.invalidEmailOrUsername),
}

export const coreErrors = {
    imageNotFound: (): NotFoundError =>
        httpErrors.notFound('Image Not Found', errorCodes.core.imageNotFound),
}

export const libraryErrors = {
    activityNotFound: (): NotFoundError =>
        httpErrors.notFound('Activity Not Found', errorCodes.library.activityNotFound),
}

export const elasticErrors = {
    queryFailed: (): BadGatewayError =>
        httpErrors.badGateway('Elastic Query Failed'),
    queryTimedOut: (): BadGatewayError =>
        httpErrors.badGateway('Elastic Query Timed Out'),
}

export const lmsErrors = {
    forbiddenLMSContextMembership: (): ForbiddenError =>
        httpErrors.forbidden('Forbidden LMSContextMembership', errorCodes.lms.forbiddenLMSContextMembership),
}
