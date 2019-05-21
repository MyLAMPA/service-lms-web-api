
import * as _ from 'lodash'

import { config } from '../../config'
import {
    State,
    LMSContextMembership,
} from '../../types'
import { source } from './source'
import { lmsContextMembershipSchema, LMSContextMembershipName } from './schemas/lmsContextMembership'

const lmsContextMembershipsCollection = source.collection<LMSContextMembership>(
    LMSContextMembershipName,
    lmsContextMembershipSchema,
    `${config.mongoose.tablePrefix ? config.mongoose.tablePrefix + '-' : ''}lmscontextmemberships`
)

export async function getLMSContextMemberships(params: object, populateContext: boolean, state: State): Promise<LMSContextMembership[]> {
    let contextMembershipsExec = lmsContextMembershipsCollection.find(params)

    if (populateContext) {
        contextMembershipsExec = contextMembershipsExec.populate('lmsContext')
    }

    const contextMemberships = await contextMembershipsExec
    return contextMemberships
        .filter(contextMembership => !_.isEmpty(contextMembership))
        .map(contextMembership => <LMSContextMembership>contextMembership)
}

export async function getLMSContextMembershipById(contextMembershipId: string, state: State): Promise<LMSContextMembership> {
    const contextMembership = await lmsContextMembershipsCollection.findById(contextMembershipId)
    if (!_.isEmpty(contextMembership)) {
        return contextMembership
    }
    return null
}

export async function createLMSContextMembership(document: LMSContextMembership, state: State): Promise<LMSContextMembership> {
    const createdContextMembership = await lmsContextMembershipsCollection.create(document)
    return createdContextMembership
}
