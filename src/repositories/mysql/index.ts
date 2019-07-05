
import * as _ from 'lodash'

import { logger } from '../../components/logger'
import { SQLQuery } from './source'

export const testConnection = async () => {
    const query = new SQLQuery<{ status: 'ok' }>(`SELECT "OK" AS status`)

    const results = await query.execute()

    if (!_.isEmpty(results) && !_.isEmpty(results[0]) && results[0].status === 'OK') {
        return null
    }

    throw Error('Invalid Response Or MySQL Connection Fail')
}
