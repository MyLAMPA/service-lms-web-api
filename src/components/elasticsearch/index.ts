
import { Client } from 'elasticsearch'
import * as _ from 'lodash'

import { config } from '../../config'
import { elasticErrors } from '../../errors'
import {
    State,
} from '../../types'
import {
    QueryResponse,
} from './index.d'

export const client = new Client({
    host: config.elasticSearch.host,
})

export const makeElasticQueryOnCollection = <Model extends {} = any>(
    mongoCollection: any,
    query: object,
    state: State,
    size: number = undefined,
    from: number = undefined,
): Promise<QueryResponse<Model>> => {
    return new Promise<QueryResponse<Model>>((resolve, reject) => {
        mongoCollection.search(query, { size, from, hydrate: false }, (err: any, result: QueryResponse<Model>) => {
            if (err) {
                console.error(err)
                state.logger.error({ err }, 'Query to ElasticSearch failed')
                return reject(elasticErrors.queryFailed())
            }
            if (!!_.get(result, 'timed_out')) {
                state.logger.error({ result }, 'Query to ElasticSearch timed out')
                return reject(elasticErrors.queryTimedOut())
            }
            return resolve(result)
        })
    })
}
