
import {
    LoggerOptions as BunyanLoggerOptions,
} from 'bunyan'

import { SubscriptionManagementServiceConfig } from '../components/externalServices/subscriptionManagementApi/index.d'
import { IdentityServiceConfig } from '../components/externalServices/identity/index.d'

export type Config = {
    environment: string
    configEnv: string
    version: VersionConfig
    log: LogConfig
    server: ServerConfig
    params: ParamsConfig
    auth: AuthConfig
    aws: AWSConfig
    mongoose: MongooseConfig
    subscriptionManagementService: SubscriptionManagementServiceConfig
    identityService: IdentityServiceConfig
    smtp: SMTPConfig
}

export type VersionConfig = {
    deploymentVersion: string
}

export type LogConfig = {
    bunyan: BunyanLoggerOptions
}

export type ServerConfig = {
    host: string
    port: number
}

export type ParamsConfig = {
    sendErrorStackTrace: boolean
}

export type AuthConfig = {
    accessTokenSecret: string
    refreshTokenSecret: string
    accessTokenExpirationMinutes: number
    refreshTokenExpirationMinutes: number
    jwtSecret: string
    hashSaltRounds: number
}

export type AWSConfig = {
    accessKeyId: string
    secretAccessKey: string
    region: string
    dynamodb: AWSDynamoDB
}

export interface AWSDynamoDB {
    tableNamePrefix: string
}

export type MongooseConfig = {
    uri: string
    db: string
    tablePrefix: string
}

export type SMTPConfig = {
    host: string
    port: number
    secure: boolean
    auth: SMTPAuth
}

export type SMTPAuth = {
    user: string
    pass: string
}
