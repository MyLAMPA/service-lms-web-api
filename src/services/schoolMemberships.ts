
import * as _ from 'lodash'

import { httpErrors as errors } from '../errors'
import {
    State,
} from '../models'
import {
    SchoolMembership,
    SchoolMembershipRole,
} from '../types/user'
import { schoolMembershipsRepository } from '../repositories'

export async function getActiveUserMemberships(userId: string, state: State): Promise<SchoolMembership[]> {
    throw errors.serverError('deprached api')
}

export async function getActiveUserMembershipsWithSchool(userId: string, state: State): Promise<SchoolMembership[]> {
    throw errors.serverError('deprached api')
}

export async function getSchoolMembershipById(schoolMembershipId: string, state: State): Promise<SchoolMembership> {
    throw errors.serverError('deprached api')
}
