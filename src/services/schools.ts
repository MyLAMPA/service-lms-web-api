
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors } from '../errors'
import {
    State,
    School,
} from '../models'

export async function getSchoolById(schoolId: string, populateCurrentSchoolYear: boolean, state: State): Promise<School> {
    throw errors.serverError('deprached api')
}

export async function createSchool(school: School, state: State): Promise<School> {
    throw errors.serverError('deprached api')
    // const _school = await db.schools.create(school)
    // return _school.toObject()
}

export async function updateSchoolById(schoolId: string, change: object, state: State): Promise<School> {
    throw errors.serverError('deprached api')
    // await db.schools.findByIdAndUpdate(schoolId, change)
    // return getSchoolById(schoolId, false, state)
}
