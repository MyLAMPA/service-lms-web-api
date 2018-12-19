
import * as _ from 'lodash'

import { config } from '../../config'
import {
    State,
} from '../../types'
import {
    School,
} from '../../types/lms'
import { source } from './source'
import { schoolSchema, SchoolName } from './schemas/school'

const schoolsCollection = source.collection<School>(
    SchoolName,
    schoolSchema,
    `${config.mongoose.tablePrefix ? config.mongoose.tablePrefix + '-' : ''}schools`
)

export async function getSchoolById(schoolId: string, state: State): Promise<School> {
    const school = await schoolsCollection.findById(schoolId)
    if (!_.isEmpty(school)) {
        return school
    }
    return null
}
