
import * as _ from 'lodash'

import { httpErrors as errors } from '../errors'
import {
    State,
    LMSCtx,
    LMSContext,
    ContextStatus,
} from '../types'
import { lmsContextsRepository } from '../repositories'
import * as lmsContextMembershipsServices from './lmsContextMemberships'

export async function getLMSContextById(lmsContextId: string, state: State): Promise<LMSContext> {
    const lmsContext = await lmsContextsRepository.getLMSContextById(lmsContextId, state)
    if (lmsContext) {
        return lmsContext
    }
    throw errors.notFound('LMSContext Not Found')
}

export async function setLMSContextStatus(lmsContextId: string, status: ContextStatus, state: State) {
    await lmsContextsRepository.updateLMSContextStatus(lmsContextId, status, state)
}

export async function resolveLMSContextFromMembership(lmsContextMembershipId: string, state: State): Promise<LMSCtx> {
    const lmsContextMembership = await lmsContextMembershipsServices.getLMSContextMembershipById(lmsContextMembershipId, state)

    if (lmsContextMembership.userId !== state.idCtx.userId) {
        throw errors.unauthorized('Forbidden LMSContext')
    }

    return {
        contextId: String(lmsContextMembership.context),
        role: lmsContextMembership.role,
        membershipId: String(lmsContextMembership._id),
        userId: lmsContextMembership.userId,
        studentId: null,
        teacherId: null,
    }
}
