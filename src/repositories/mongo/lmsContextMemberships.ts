
import * as _ from 'lodash'

import { config } from '../../config'
import {
    State,
    LmsContextMembership,
} from '../../types'
import { source } from './source'
import { LmsTableName } from './schemas'
import { lmsContextMembershipSchema } from './schemas/lmsContextMembership'

const lmsContextMembershipsCollection = source.collection<LmsContextMembership>(
    LmsTableName.lmsContextMembership,
    lmsContextMembershipSchema,
    `${config.mongoose.tablePrefix ? config.mongoose.tablePrefix + '-' : ''}lms-lmscontextmemberships`
)

export async function getLMSContextMemberships(params: object, populateContext: boolean, state: State): Promise<LmsContextMembership[]> {
    let contextMembershipsExec = lmsContextMembershipsCollection.find(params)

    if (populateContext) {
        contextMembershipsExec = contextMembershipsExec.populate('lmsContext')
    }

    const contextMemberships = await contextMembershipsExec
    return contextMemberships
        .filter(contextMembership => !_.isEmpty(contextMembership))
        .map(contextMembership => <LmsContextMembership>contextMembership)
}

export async function getLMSContextMembershipById(contextMembershipId: string, state: State): Promise<LmsContextMembership> {
    const contextMembership = await lmsContextMembershipsCollection.findById(contextMembershipId)
    if (!_.isEmpty(contextMembership)) {
        return contextMembership
    }
    return null
}

export async function createLMSContextMembership(document: LmsContextMembership, state: State): Promise<LmsContextMembership> {
    const createdContextMembership = await lmsContextMembershipsCollection.create(document)
    return createdContextMembership
}
