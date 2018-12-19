
import * as path from 'path'
import * as fs from 'fs'
import * as _ from 'lodash'

import { Config } from './index.d'

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
        jwtSecret: 'abc123',
        hashSaltRounds: 12,
    },
    mongoose: {
        uri: 'mongodb://127.0.0.1:27017',
        db: 'lampa',
        tablePrefix: '',
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

let environmentConfig = { }
const environmentConfigPath = path.resolve(__dirname, `./env/${defaultConfig.configEnv}.js`)
if (fs.existsSync(environmentConfigPath)) {
    environmentConfig = require(environmentConfigPath)
}

const config: Config = _.merge(defaultConfig, environmentConfig)

export { config }