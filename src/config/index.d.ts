
import {
    LoggerOptions as BunyanLoggerOptions,
} from 'bunyan'

export type Config = {
    environment: string;
    configEnv: string;
    version: VersionConfig;
    log: LogConfig;
    server: ServerConfig;
    params: ParamsConfig;
    auth: AuthConfig;
    mongoose: MongooseConfig;
    smtp: SMTPConfig;
};

export type VersionConfig = {
    deploymentVersion: string;
};

export type LogConfig = {
    bunyan: BunyanLoggerOptions;
};

export type ServerConfig = {
    host: string;
    port: number;
};

export type ParamsConfig = {
    sendErrorStackTrace: boolean;
};

export type AuthConfig = {
    jwtSecret: string;
    hashSaltRounds: number;
};

export type MongooseConfig = {
    uri: string;
    db: string;
    tablePrefix: string;
};

export type SMTPConfig = {
    host: string;
    port: number;
    secure: boolean;
    auth: SMTPAuth;
};

export type SMTPAuth = {
    user: string;
    pass: string;
};