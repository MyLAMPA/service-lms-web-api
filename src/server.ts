
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as _ from 'lodash'

import {
    appendChildLogger,
    initialLog,
    commonTrackers,
    standardHandler,
    errorHandler,
} from './middlewares'
import { router } from './router'

const server = express()

server
    .use(bodyParser.urlencoded({
        extended: true,
    }), bodyParser.json(), cookieParser())
    .use(commonTrackers, appendChildLogger, initialLog)
    .use('/', router)
    .use(errorHandler, standardHandler)

export { server }