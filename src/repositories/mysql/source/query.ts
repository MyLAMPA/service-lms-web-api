
import * as _ from 'lodash'

import { connection } from '../../../components/mysql'

export class SQLQuery<Response> {
    private _query: string

    constructor(query: string) {
        this._query = query
    }

    public execute = (): Promise<Response> => {
        return new Promise((resolve, reject) => {
            connection
                .query(this._query, (err, results) => {
                    if (err) {
                        return reject(err)
                    }
                    let queryResult: any = null
                    if (_.isArray(results)) {
                        queryResult = results.filter(item => !_.isEmpty(item)).map(item => _.merge({}, item))
                    } else if (!_.isEmpty(results)) {
                        queryResult = _.merge({}, results)
                    }
                    return resolve(queryResult)
                })
        })
    }
}
