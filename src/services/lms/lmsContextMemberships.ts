
import * as _ from 'lodash'

import { httpErrors as errors } from '../../errors'
import {
    State,
    LMSContextMembership,
    LMSContextMembershipRole,
} from '../../types'
import { lmsContextMembershipsRepository } from '../../repositories'

export async function getCurrentUserActiveMemberships(state: State): Promise<LMSContextMembership[]> {
    const { emailAddresses } = state.idCtx
    const query = { isActive: true, emailAddress: { $in: emailAddresses } }
    const contextMemberships = await lmsContextMembershipsRepository.getLMSContextMemberships(query, true, state)
    return contextMemberships
}

export async function getLMSContextMembershipById(lmsContextMembershipId: string, state: State): Promise<LMSContextMembership> {
    const lmsContextMembership = await lmsContextMembershipsRepository.getLMSContextMembershipById(lmsContextMembershipId, state)
    if (lmsContextMembership) {
        return lmsContextMembership
    }
    throw errors.notFound('LMSContextMembership Not Found')
}

export async function createLMSContextMembership(lmsContextMembership: LMSContextMembership, state: State): Promise<LMSContextMembership> {
    const createdLMSContextMembership = await lmsContextMembershipsRepository.createLMSContextMembership(lmsContextMembership, state)
    return createdLMSContextMembership
}
