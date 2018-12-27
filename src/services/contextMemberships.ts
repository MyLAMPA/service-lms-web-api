
import * as _ from 'lodash'

import { httpErrors as errors } from '../errors'
import {
    State,
    ContextMembership,
    ContextMembershipRole,
} from '../types'
import { contextMembershipsRepository } from '../repositories'

export async function getActiveUserMemberships(userId: number, state: State): Promise<ContextMembership[]> {
    const contextMemberships = await contextMembershipsRepository.getContextMemberships({ userId }, false, state)
    return contextMemberships
}

export async function getActiveUserMembershipsWithContext(userId: number, state: State): Promise<ContextMembership[]> {
    const contextMemberships = await contextMembershipsRepository.getContextMemberships({ userId }, true, state)
    return contextMemberships
}

export async function getContextMembershipById(contextMembershipId: string, state: State): Promise<ContextMembership> {
    const contextMembership = await contextMembershipsRepository.getContextMembershipById(contextMembershipId, state)
    if (contextMembership) {
        return contextMembership
    }
    throw errors.notFound('ContextMembership Not Found')
}

export async function createSchoolMembership(contextMembership: ContextMembership, state: State): Promise<ContextMembership> {
    const createdContextMembership = await contextMembershipsRepository.createContextMembership(contextMembership, state)
    return createdContextMembership
}
