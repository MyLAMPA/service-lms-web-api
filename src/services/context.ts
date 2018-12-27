
import * as _ from 'lodash'

import { httpErrors as errors } from '../errors'
import {
    State,
    LMSCtx,
    Context,
    ContextStatus,
} from '../types'
import { contextsRepository } from '../repositories'
import * as contextMembershipsServices from './contextMemberships'

export async function getContextById(contextId: string, state: State): Promise<Context> {
    const context = await contextsRepository.getContextById(contextId, state)
    if (context) {
        return context
    }
    throw errors.notFound('Context Not Found')
}

export async function setContextStatus(contextId: string, status: ContextStatus, state: State) {
    await contextsRepository.updateContextStatus(contextId, status, state)
}

export async function resolveContext(contextMembershipId: string, state: State): Promise<LMSCtx> {
    const contextMembership = await contextMembershipsServices.getContextMembershipById(contextMembershipId, state)

    if (contextMembership.userId !== state.idCtx.userId) {
        throw errors.unauthorized('Forbidden Context')
    }

    return {
        contextId: String(contextMembership.context),
        role: contextMembership.role,
        membershipId: String(contextMembership._id),
        userId: contextMembership.userId,
        studentId: null,
        teacherId: null,
    }
}
