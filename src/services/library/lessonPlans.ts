
import slugify from 'slugify'
import * as _ from 'lodash'

import { httpErrors } from '../../errors'
import {
    State,
} from '../../types'
import {
    LessonPlan,
    Activity,
} from '../../types/library'
import { Pagination } from '../../helpers/pagination'
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
    throw httpErrors.notFound('LessonPlan Not Found')
}

export const getLessonPlanByIdPopulated = async(lessonPlanId: string, state: State): Promise<LessonPlan> => {
    const lessonPlan = await lessonPlansRepository.getLessonPlanByIdPopulated(lessonPlanId, state)
    if (lessonPlan) {
        return lessonPlan
    }
    throw httpErrors.notFound('LessonPlan Not Found')
}

export const getLessonPlanBySlug = async(lessonPlanSlug: string, state: State): Promise<LessonPlan> => {
    const lessonPlan = await lessonPlansRepository.getLessonPlanBySlug(lessonPlanSlug, state)
    if (lessonPlan) {
        return lessonPlan
    }
    throw httpErrors.notFound('LessonPlan Not Found')
}

export const getLessonPlanBySlugPopulated = async(lessonPlanSlug: string, state: State): Promise<LessonPlan> => {
    const lessonPlan = await lessonPlansRepository.getLessonPlanBySlugPopulated(lessonPlanSlug, state)
    if (lessonPlan) {
        return lessonPlan
    }
    throw httpErrors.notFound('LessonPlan Not Found')
}
