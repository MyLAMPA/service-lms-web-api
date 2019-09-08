
import * as _ from 'lodash'

import { config } from '../../../config'
import {
    State,
} from '../../../types'
import {
    Subject,
} from '../../../types/library'
import { source } from '../../mongo/source'
import { subjectSchema, SubjectName } from './schemas/subject'

const subjectsCollection = source.collection<Subject>(
    SubjectName,
    subjectSchema,
    `${config.mongoose.tablePrefix ? config.mongoose.tablePrefix + '-' : ''}library-subjects`
)

export async function getSubjects(params: object, state: State) {
    const subjects = await subjectsCollection.find(params)
    return subjects
        .filter(subject => !_.isEmpty(subject))
        .map(subject => <Subject>subject)
}

export async function getSubjectById(subjectId: string, state: State): Promise<Subject> {
    const subject = await subjectsCollection.findById(subjectId)
    if (!_.isEmpty(subject)) {
        return subject
    }
    return null
}
