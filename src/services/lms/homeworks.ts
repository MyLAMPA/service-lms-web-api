
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors } from '../../errors'
import {
    State,
} from '../../models'
import {
    Homework,
} from '../../types/lms'
import { homeworksRepository } from '../../repositories'

export async function getHomeworks(params: object, populateDueLesson: boolean, populateOriginLesson: boolean, state: State): Promise<Homework[]> {
    const homeworks = await homeworksRepository.getHomeworks(params, populateDueLesson, populateOriginLesson, state)
    return homeworks
}

export async function getHomeworkById(homeworkId: string, populateDueLesson: boolean, populateOriginLesson: boolean, state: State): Promise<Homework> {
    const homework = await homeworksRepository.getHomeworkById(homeworkId, populateDueLesson, populateOriginLesson, state)
    if (homework) {
        return homework
    }
    throw errors.notFound('Homework Not Found')
}

// export async function createHomework(homework: Partial<Homework>, state: State): Promise<Homework> {
//     const _homework = _.merge(
//         {},
//         {
//             school: String(state.school._id),
//             dueLesson: null,
//             originLesson: null,
//             title: null,
//             assignment: null,
//             isDone: false,
//         },
//         _.pick(homework, ['dueLesson', 'originLesson', 'title', 'assignment'])
//     )
//     const createdHomework = await db.homeworks.create(_homework)
//     return createdHomework.toObject()
// }

// export async function updateHomeworkById(homeworkId: string, change: object, state: State): Promise<Homework> {
//     await db.homeworks.findByIdAndUpdate(homeworkId, change)
//     return getHomeworkById(homeworkId, false, false, state)
// }

// export async function deleteHomeworkById(homeworkId: string, state: State): Promise<Homework> {
//     const homework = await db.homeworks.findByIdAndRemove(homeworkId).lean()
//     return homework
// }
