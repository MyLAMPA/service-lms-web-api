
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors } from '../errors'
import {
    State,
    Course,
} from '../models'
import { coursesRepository } from '../repositories'

export async function getCourses(params: object, state: State): Promise<Course[]> {
    throw errors.serverError('deprached api')
}

export async function getCourseById(courseId: string, state: State): Promise<Course> {
    throw errors.serverError('deprached api')
}

export async function createCourse(course: Course, state: State): Promise<Course> {
    throw errors.serverError('deprached api')
}

export async function updateCourseById(courseId: string, change: object, state: State): Promise<Course> {
    throw errors.serverError('deprached api')
}
