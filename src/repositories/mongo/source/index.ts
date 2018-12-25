
import { config } from '../../../config'
import { logger } from '../../../components/logger'
import { MongooseSource } from '../../../components/mongooseSource'

const source = new MongooseSource(`${config.mongoose.uri}/${config.mongoose.db}`)

try {
    source.connect()
} catch (err) {
    logger.error({ err }, 'Connecting to MongoDB')
}

export { source }
