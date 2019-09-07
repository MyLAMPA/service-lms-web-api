import * as _ from 'lodash'

import { config } from '../../../config'
import {
    State,
} from '../../../types'
import {
    LessonPlan,
} from '../../../types/library'
import { source } from '../../mongo/source'
import { lessonPlanSchema, LessonPlanName } from './schemas/lessonPlan'

const lessonPlansCollection = source.collection<LessonPlan>(
    LessonPlanName,
    lessonPlanSchema,
    `${config.mongoose.tablePrefix ? config.mongoose.tablePrefix + '-' : ''}library-lessonplans`
)

export const getLessonPlans = async(params: object, state: State) => {
    const lessonPlans = await lessonPlansCollection.find(params)
    return lessonPlans
        .filter(lessonPlan => !_.isEmpty(lessonPlan))
        .map(lessonPlan => <LessonPlan>lessonPlan)
}

export const getLessonPlanById = async(lessonPlanId: string, state: State): Promise<LessonPlan> => {
    const lessonPlan = await lessonPlansCollection.findById(lessonPlanId)
    if (!_.isEmpty(lessonPlan)) {
        return lessonPlan
    }
    return null
}

export const getLessonPlanByIdPopulated = async(lessonPlanId: string, state: State): Promise<LessonPlan> => {
    const lessonPlan = await lessonPlansCollection.findById(lessonPlanId).populate('activities')
    if (!_.isEmpty(lessonPlan)) {
        return lessonPlan
    }
    return null
}

export const getLessonPlanBySlug = async(lessonPlanSlug: string, state: State) => {
    const lessonPlan = await lessonPlansCollection.findOne({ slug: lessonPlanSlug })
    if (!_.isEmpty(lessonPlan)) {
        return lessonPlan
    }
    return null
}

export const getLessonPlanBySlugPopulated = async(lessonPlanSlug: string, state: State) => {
    const lessonPlan = await lessonPlansCollection.findOne({ slug: lessonPlanSlug }).populate('activities')
    if (!_.isEmpty(lessonPlan)) {
        return lessonPlan
    }
    return null
}

export const createLessonPlan = async(document: LessonPlan, state: State): Promise<LessonPlan> => {
    const createdLessonPlan = await lessonPlansCollection.create(document)
    return createdLessonPlan
}

export const updateLessonPlanById = async(lessonPlanId: string, change: object, state: State): Promise<void> => {
    await lessonPlansCollection.findByIdAndUpdate(lessonPlanId, change)
}
