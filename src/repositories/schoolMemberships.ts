
import * as _ from 'lodash'

import {
    State,
} from '../models'
import {
    SchoolMembership,
} from '../types/user'
import * as source from './mongo/source'

export async function getSchoolMemberships(params: object, populateSchool: boolean, state: State): Promise<SchoolMembership[]> {
    let schoolMembershipsExec = source.schoolMemberships.find(params)

    if (populateSchool) {
        schoolMembershipsExec = schoolMembershipsExec.populate('school')
    }

    const schoolMemberships = await schoolMembershipsExec
    return schoolMemberships
        .filter(schoolMembership => !_.isEmpty(schoolMembership))
        .map(schoolMembership => <SchoolMembership>schoolMembership)
}

export async function getSchoolMembershipById(schoolMembershipId: string, state: State): Promise<SchoolMembership> {
    const schoolMembership = await source.schoolMemberships.findById(schoolMembershipId)
    if (!_.isEmpty(schoolMembership)) {
        return schoolMembership
    }
    return null
}
