
import * as _ from 'lodash'

import { config } from '../../config'
import {
    State,
} from '../../types'
import {
    SchoolMembership,
} from '../../types/identity'
import { source } from './source'
import { schoolMembershipSchema, SchoolMembershipName } from './schemas/schoolMembership'

const schoolMembershipsCollection = source.collection<SchoolMembership>(
    SchoolMembershipName,
    schoolMembershipSchema,
    `${config.mongoose.tablePrefix ? config.mongoose.tablePrefix + '-' : ''}schoolmemberships`
)

export async function getSchoolMemberships(params: object, populateSchool: boolean, state: State): Promise<SchoolMembership[]> {
    let schoolMembershipsExec = schoolMembershipsCollection.find(params)

    if (populateSchool) {
        schoolMembershipsExec = schoolMembershipsExec.populate('school')
    }

    const schoolMemberships = await schoolMembershipsExec
    return schoolMemberships
        .filter(schoolMembership => !_.isEmpty(schoolMembership))
        .map(schoolMembership => <SchoolMembership>schoolMembership)
}

export async function getSchoolMembershipById(schoolMembershipId: string, state: State): Promise<SchoolMembership> {
    const schoolMembership = await schoolMembershipsCollection.findById(schoolMembershipId)
    if (!_.isEmpty(schoolMembership)) {
        return schoolMembership
    }
    return null
}

export async function createSchoolMembership(document: SchoolMembership, state: State): Promise<SchoolMembership> {
    const createdSchoolMembership = await schoolMembershipsCollection.create(document)
    return createdSchoolMembership
}
