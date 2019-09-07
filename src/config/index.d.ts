
import {
    LoggerOptions as BunyanLoggerOptions,
} from 'bunyan'

import { IdentityServiceConfig } from '../components/externalServices/identity/index.d'
import { StripeConnectServiceConfig } from '../components/externalServices/stripeConnect/index.d'
import { SubscriptionManagementServiceConfig } from '../components/externalServices/subscriptionManagementApi/index.d'
import { SubscriptionsServiceConfig } from '../components/externalServices/subscriptionsService/index.d'

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
    elasticSearch: ElasticSearchConfig
    mysql: MysqlConfig
    identityService: IdentityServiceConfig
    stripeConnectService: StripeConnectServiceConfig
    subscriptionManagementService: SubscriptionManagementServiceConfig
    subscriptionsService: SubscriptionsServiceConfig
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
    enablePublicReadProxy: boolean
    accessTokenSecret: string
    refreshTokenSecret: string
    accessTokenExpirationMinutes: number
    refreshTokenExpirationMinutes: number
    accessKey: {
        id: string
        secret: string
    }
    jwtSecret: string
    hashSaltRounds: number
}

export type AWSConfig = {
    accessKeyId: string
    secretAccessKey: string
    region: string
    dynamodb: AWSDynamoDB
    s3: AWSS3Config
}

export interface AWSDynamoDB {
    tableNamePrefix: string
}

export interface AWSS3Config {
    bucket: string
}

export type MongooseConfig = {
    uri: string
    db: string
    tablePrefix: string
}

export type ElasticSearchConfig = {
    host: string
}

export type MysqlConfig = {
    host: string
    port: number
    database: string
    user: string
    password: string
    // timeout: number
    // connectTimeout: number
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
