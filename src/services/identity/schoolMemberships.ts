
import * as _ from 'lodash'

import { httpErrors as errors } from '../../errors'
import {
    State,
} from '../../types'
import {
    SchoolMembership,
    SchoolMembershipRole,
} from '../../types/identity'
import { schoolMembershipsRepository } from '../../repositories'

export async function getActiveUserMemberships(userId: string, state: State): Promise<SchoolMembership[]> {
    const schoolMemberships = await schoolMembershipsRepository.getSchoolMemberships({ user: userId }, false, state)
    return schoolMemberships
}

export async function getActiveUserMembershipsWithSchool(userId: string, state: State): Promise<SchoolMembership[]> {
    const schoolMemberships = await schoolMembershipsRepository.getSchoolMemberships({ user: userId }, true, state)
    return schoolMemberships
}

export async function getSchoolMembershipById(schoolMembershipId: string, state: State): Promise<SchoolMembership> {
    const schoolMembership = await schoolMembershipsRepository.getSchoolMembershipById(schoolMembershipId, state)
    if (schoolMembership) {
        return schoolMembership
    }
    throw errors.notFound('SchoolMembership Not Found')
}

export async function createSchoolMembership(schoolMembership: SchoolMembership, state: State): Promise<SchoolMembership> {
    const createdSchoolMembership = await schoolMembershipsRepository.createSchoolMembership(schoolMembership, state)
    return createdSchoolMembership
}