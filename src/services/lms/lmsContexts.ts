
import * as _ from 'lodash'

import { httpErrors, lmsErrors } from '../../errors'
import {
    State,
    LMSCtx,
    LmsContext,
    LmsContextMembership,
    LmsContextStatus,
} from '../../types'
import { lmsContextsRepository } from '../../repositories'
import * as lmsContextMembershipsServices from './lmsContextMemberships'
import * as emailAddressesServices from '../emailAddresses'

export async function resolveLMSContextFromMembership(lmsContextMembershipId: string, state: State): Promise<LMSCtx> {
    const lmsContextMembership = await lmsContextMembershipsServices.getLMSContextMembershipById(lmsContextMembershipId, state)

    const { userId } = state.idCtx
    const emailAddress = await emailAddressesServices.getEmailAddressById(lmsContextMembership.emailAddress, state)
    if (userId === emailAddress.userId) {
        state.logger.warn({ userId, lmsContextMembershipId, emailAddress }, 'Attempt to use forbidden LMSContext')
        throw lmsErrors.forbiddenLMSContextMembership()
    }

    return {
        userId,
        contextId: String(lmsContextMembership.lmsContext),
        role: lmsContextMembership.role,
        membershipId: String(lmsContextMembership._id),
        studentId: null,
        teacherId: null,
    }
}

export async function getLMSContextById(lmsContextId: string, state: State): Promise<LmsContext> {
    const lmsContext = await lmsContextsRepository.getLMSContextById(lmsContextId, state)
    if (lmsContext) {
        return lmsContext
    }
    throw httpErrors.notFound('LMSContext Not Found')
}

export async function setLMSContextStatus(lmsContextId: string, status: LmsContextStatus, state: State) {
    await lmsContextsRepository.updateLMSContextStatus(lmsContextId, status, state)
}

export const createLmsContext = async(lmsContext: LmsContext, state: State) => {
    const createdLmsContext = await lmsContextsRepository.createLmsContext(lmsContext, state)
    return createdLmsContext
}
