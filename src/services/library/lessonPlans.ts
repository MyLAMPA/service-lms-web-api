
import * as _ from 'lodash'

import { httpErrors as errors } from '../../errors'
import {
    State,
} from '../../types'
import {
    LessonPlan,
} from '../../types/library'
import { lessonPlansRepository } from '../../repositories'

export async function getLessonPlanById(lessonPlanId: string, state: State): Promise<LessonPlan> {
    const lessonPlan = await lessonPlansRepository.getLessonPlanById(lessonPlanId, state)
    if (lessonPlan) {
        return lessonPlan
    }
    throw errors.notFound('LessonPlan Not Found')
}
