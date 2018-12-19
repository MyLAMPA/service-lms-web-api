
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors } from '../errors'
import {
    State,
    Homework,
} from '../models'
import * as lessonsServices from './lessons'

export async function getHomeworks(params: object, populateDueLesson: boolean, populateOriginLesson: boolean, state: State): Promise<Homework[]> {
    throw errors.serverError('deprached api')
}

export async function getHomeworkById(homeworkId: string, populateDueLesson: boolean, populateOriginLesson: boolean, state: State): Promise<Homework> {
    throw errors.serverError('deprached api')
}

export async function createHomework(homework: Partial<Homework>, state: State): Promise<Homework> {
    throw errors.serverError('deprached api')
}

export async function updateHomeworkById(homeworkId: string, change: object, state: State): Promise<Homework> {
    throw errors.serverError('deprached api')
}

export async function deleteHomeworkById(homeworkId: string, state: State): Promise<Homework> {
    throw errors.serverError('deprached api')
}
