
import slugify from 'slugify'
import * as _ from 'lodash'

import { httpErrors as errors, httpErrors } from '../../errors'
import {
    State,
} from '../../types'
import {
    LessonPlan,
} from '../../types/library'
import { normalizeString } from '../../helpers/normalizeString'
import { lessonPlansRepository } from '../../repositories'

const slugifyLessonPlanTitle = (title: string, state: State): string => {
    throw httpErrors.serverError('Not Implemented')
}

export const getLessonPlanById = async(lessonPlanId: string, state: State): Promise<LessonPlan> => {
    const lessonPlan = await lessonPlansRepository.getLessonPlanById(lessonPlanId, state)
    if (lessonPlan) {
        return lessonPlan
    }
    throw errors.notFound('LessonPlan Not Found')
}
