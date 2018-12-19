
import * as _ from 'lodash'

import { config } from '../../config'
import {
    State,
} from '../../models'
import {
    SchoolYear,
} from '../../types/lms'
import { source } from './source'
import { schoolYearSchema, SchoolYearName } from './schemas/schoolYear'

const schoolYearsCollection = source.collection<SchoolYear>(
    SchoolYearName,
    schoolYearSchema,
    `${config.mongoose.tablePrefix ? config.mongoose.tablePrefix + '-' : ''}schoolyears`
)

export async function getSchoolYears(params: object, state: State): Promise<SchoolYear[]> {
    const schoolYears = await schoolYearsCollection.find(params)
    return schoolYears
        .filter(schoolYear => !_.isEmpty(schoolYear))
        .map(schoolYear => <SchoolYear>schoolYear)
}

export async function getSchoolYearById(schoolYearId: string, state: State): Promise<SchoolYear> {
    const schoolYear = await schoolYearsCollection.findById(schoolYearId)
    if (!_.isEmpty(schoolYear)) {
        return schoolYear
    }
    return null
}
