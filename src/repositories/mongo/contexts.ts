
import * as _ from 'lodash'

import { config } from '../../config'
import {
    State,
    Context,
    ContextStatus,
} from '../../types'
import { source } from './source'
import { contextSchema, ContextName } from './schemas/context'

const contextsCollection = source.collection<Context>(
    ContextName,
    contextSchema,
    `${config.mongoose.tablePrefix ? config.mongoose.tablePrefix + '-' : ''}contexts`
)

export async function getContextById(contextId: string, state: State): Promise<Context> {
    const context = await contextsCollection.findById(contextId)
    if (!_.isEmpty(context)) {
        return context
    }
    return null
}

export async function updateContextStatus(contextId: string, status: ContextStatus, state: State): Promise<void> {
    await contextsCollection.findByIdAndUpdate(contextId, { $set: { status } })
}
