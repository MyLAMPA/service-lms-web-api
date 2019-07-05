
import * as mysql from 'mysql'

import { config } from '../../config'

const connection = mysql.createConnection(config.mysql)

export { connection }
