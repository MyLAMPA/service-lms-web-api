
import * as _ from 'lodash'

import { config } from '../../config'
import {
    State,
    LMSContext,
    ContextStatus,
} from '../../types'
import { source } from './source'
import { LmsTableName } from './schemas'
import { lmsContextSchema } from './schemas/lmsContext'

const lmsContextsCollection = source.collection<LMSContext>(
    LmsTableName.lmsContext,
    lmsContextSchema,
    `${config.mongoose.tablePrefix ? config.mongoose.tablePrefix + '-' : ''}lms-lmscontexts`
)

export async function getLMSContextById(lmsContextId: string, state: State): Promise<LMSContext> {
    const lmsContext = await lmsContextsCollection.findById(lmsContextId)
    if (!_.isEmpty(lmsContext)) {
        return lmsContext
    }
    return null
}

export async function updateLMSContextStatus(lmsContextId: string, status: ContextStatus, state: State): Promise<void> {
    await lmsContextsCollection.findByIdAndUpdate(lmsContextId, { $set: { status } })
}
