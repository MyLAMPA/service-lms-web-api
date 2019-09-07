
import * as path from 'path'
import * as fs from 'fs'
import * as _ from 'lodash'

import { Config } from './index.d'
import { envConfig } from './envConfig'

const defaultConfig: Config = {
    environment: _.isString(process.env.NODE_ENV) ? process.env.NODE_ENV : 'dev',
    configEnv: _.isString(process.env.CONFIG_ENV) ? process.env.CONFIG_ENV : 'localhost',
    version: {
        deploymentVersion: 'notSet',
    },
    log: {
        bunyan: {
            name: 'service-lms-web-api',
        },
    },
    server: {
        host: '0.0.0.0',
        port: 8080,
    },
    params: {
        sendErrorStackTrace: true,
    },
    auth: {
        enablePublicReadProxy: true,
        accessTokenSecret: 'notSet',
        refreshTokenSecret: 'notSet',
        accessTokenExpirationMinutes: 60 * 60 * 24 * 7, // 7 days
        refreshTokenExpirationMinutes: 60 * 60 * 24 * 365, // 1 year
        accessKey: {
            id: 'notSet', // process.env.ACCESS_KEY_ID
            secret: 'notSet', // process.env.ACCESS_KEY_SECRET
        },
        jwtSecret: 'abc123',
        hashSaltRounds: 12,
    },
    aws: {
        accessKeyId: 'notSet',
        secretAccessKey: 'notSet',
        region: 'eu-central-1',
        dynamodb: {
            tableNamePrefix: 'notSet',
        },
        s3: {
            bucket: 'notSet',
        },
    },
    mongoose: {
        uri: 'mongodb://127.0.0.1:27017',
        db: 'lampa',
        tablePrefix: null,
    },
    elasticSearch: {
        host: 'notSet',
    },
    mysql: {
        host: 'notSet',
        port: 3306,
        database: 'notSet',
        user: 'notSet',
        password: 'notSet',
        // timeout: 1500, // 1.5s
        // connectTimeout: 2500, // 2.5s
    },
    identityService: {
        baseUrl: 'notSet',
        accessKeyId: 'notSet',
        secretAccessKey: 'notSet',
    },
    stripeConnectService: {
        baseUrl: 'notSet',
        accessKeyId: 'notSet',
        secretAccessKey: 'notSet',
    },
    subscriptionsService: {
        baseUrl: 'notSet',
        accessKeyId: 'notSet',
        secretAccessKey: 'notSet',
    },
    subscriptionManagementService: {
        baseUrl: 'notSet',
        accessKeyId: 'notSet',
        secretAccessKey: 'notSet',
    },
    smtp: {
        host: '',
        port: 0,
        secure: true,
        auth: {
            user: '',
            pass: '',
        },
    },
}

let environmentConfig = {}
const environmentConfigPath = path.resolve(__dirname, `./env/${defaultConfig.configEnv}.js`)
if (fs.existsSync(environmentConfigPath)) {
    environmentConfig = require(environmentConfigPath).default
}

const config: Config = _.merge(defaultConfig, environmentConfig, envConfig, { configEnv: 'test' })

export { config }