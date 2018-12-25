
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors } from '../errors'
import {
    State,
    Course,
} from '../types'
import { coursesRepository } from '../repositories'

export async function getCourses(params: object, state: State): Promise<Course[]> {
    const courses = await coursesRepository.getCourses(params, state)
    return courses
}

export async function getCourseById(courseId: string, state: State): Promise<Course> {
    const course = await coursesRepository.getCourseById(courseId, state)
    if (course) {
        return course
    }
    throw errors.notFound('Course Not Found')
}

export async function createCourse(course: Course, state: State): Promise<Course> {
    const document = _.merge(
        {},
        _.pick(course, ['name', 'abbr', 'description', 'color']),
        { school: state.lmsCtx.schoolId }
    )
    return await coursesRepository.createCourse(document, state)
}

export async function updateCourseById(courseId: string, change: object, state: State): Promise<Course> {
    await coursesRepository.updateCourseById(courseId, change, state)
    return getCourseById(courseId, state)
}
