
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors } from '../errors'
import {
    State,
    School,
} from '../models'
import * as db from '../repositories/mongo'

export async function getSchoolById(schoolId: string, populateCurrentSchoolYear: boolean, state: State): Promise<School> {
    let schoolExec = db.schools.findById(schoolId)
    if (populateCurrentSchoolYear) {
        schoolExec = schoolExec.populate('currentSchoolYear')
    }
    const school = await schoolExec.lean()
    if (!_.isNil(school)) {
        return school
    }
    throw errors.notFound('School Not Found')
}

export async function createSchool(school: School, state: State): Promise<School> {
    const _school = await db.schools.create(school)
    return _school.toObject()
}

export async function updateSchoolById(schoolId: string, change: object, state: State): Promise<School> {
    await db.schools.findByIdAndUpdate(schoolId, change)
    return getSchoolById(schoolId, false, state)
}
