
import * as mongoose from 'mongoose'
import { Promise as BluebirdPromise } from 'bluebird'

import { config } from '../../config'
import { logger } from '../../components/logger'

(<any>mongoose).Promise = BluebirdPromise

try {
    mongoose.connect(`${config.mongoose.uri}/${config.mongoose.db}`, { useMongoClient: true })
} catch (err) {
    logger.error({ err }, 'Connecting to mongo failed')
}

export { mongoose }