
import * as _ from 'lodash'

import { httpErrors as errors } from '../errors'
import {
    State,
    SchoolYear,
} from '../models'

export async function getSchoolYears(params: object, state: State): Promise<SchoolYear[]> {
    throw errors.serverError('deprached api')
}

export async function getSchoolYearById(schoolYearId: string, state: State): Promise<SchoolYear> {
    throw errors.serverError('deprached api')
}

export async function createSchoolYear(schoolYear: SchoolYear, state: State): Promise<SchoolYear> {
    throw errors.serverError('deprached api')
}

export async function updateSchoolYearById(schoolYearId: string, change: object, state: State): Promise<SchoolYear> {
    throw errors.serverError('deprached api')
}

export async function deleteSchoolYearById(schoolYearId: string, state: State): Promise<SchoolYear> {
    throw errors.serverError('deprached api')
}
