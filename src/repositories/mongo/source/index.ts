
import { config } from '../../../config'
import { MongooseSource } from '../../../components/mongooseSource'

const source = new MongooseSource(`${config.mongoose.uri}/${config.mongoose.db}`)

source.connect()

export { source }
