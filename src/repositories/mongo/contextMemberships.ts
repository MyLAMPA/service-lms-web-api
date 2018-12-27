
import * as _ from 'lodash'

import { config } from '../../config'
import {
    State,
    ContextMembership,
} from '../../types'
import { source } from './source'
import { contextMembershipSchema, ContextMembershipName } from './schemas/contextMembership'

const contextMembershipsCollection = source.collection<ContextMembership>(
    ContextMembershipName,
    contextMembershipSchema,
    `${config.mongoose.tablePrefix ? config.mongoose.tablePrefix + '-' : ''}contextmemberships`
)

export async function getContextMemberships(params: object, populateContext: boolean, state: State): Promise<ContextMembership[]> {
    let contextMembershipsExec = contextMembershipsCollection.find(params)

    if (populateContext) {
        contextMembershipsExec = contextMembershipsExec.populate('context')
    }

    const contextMemberships = await contextMembershipsExec
    return contextMemberships
        .filter(contextMembership => !_.isEmpty(contextMembership))
        .map(contextMembership => <ContextMembership>contextMembership)
}

export async function getContextMembershipById(contextMembershipId: string, state: State): Promise<ContextMembership> {
    const contextMembership = await contextMembershipsCollection.findById(contextMembershipId)
    if (!_.isEmpty(contextMembership)) {
        return contextMembership
    }
    return null
}

export async function createContextMembership(document: ContextMembership, state: State): Promise<ContextMembership> {
    const createdContextMembership = await contextMembershipsCollection.create(document)
    return createdContextMembership
}
