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

export async function getLessonPlans(params: object, state: State) {
    const lessonPlans = await lessonPlansCollection.find(params)
    return lessonPlans
        .filter(lessonPlan => !_.isEmpty(lessonPlan))
        .map(lessonPlan => <LessonPlan>lessonPlan)
}

export async function getLessonPlanById(lessonPlanId: string, state: State): Promise<LessonPlan> {
    const lessonPlan = await lessonPlansCollection.findById(lessonPlanId)
    if (!_.isEmpty(lessonPlan)) {
        return lessonPlan
    }
    return null
}

export async function createLessonPlan(document: LessonPlan, state: State): Promise<LessonPlan> {
    const createdLessonPlan = await lessonPlansCollection.create(document)
    return createdLessonPlan
}

export async function updateLessonPlanById(lessonPlanId: string, change: object, state: State): Promise<void> {
    await lessonPlansCollection.findByIdAndUpdate(lessonPlanId, change)
}
