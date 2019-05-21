
import * as _ from 'lodash'

import { httpErrors as errors } from '../../errors'
import {
    State,
} from '../../types'
import {
    Subject,
} from '../../types/library'
import { subjectsRepository } from '../../repositories'

export async function getSubjectById(subjectId: string, state: State): Promise<Subject> {
    const subject = await subjectsRepository.getSubjectById(subjectId, state)
    if (subject) {
        return subject
    }
    throw errors.notFound('Subject Not Found')
}
