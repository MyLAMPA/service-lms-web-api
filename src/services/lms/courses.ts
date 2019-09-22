
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors } from '../../errors'
import {
    State,
    Course,
} from '../../types'
import { coursesRepository } from '../../repositories'

export const getCourses = async(params: object, state: State): Promise<Course[]> => {
    const courses = await coursesRepository.getCourses(params, state)
    return courses
}

export const getCourseById = async(courseId: string, state: State): Promise<Course> => {
    const course = await coursesRepository.getCourseById(courseId, state)
    if (course) {
        return course
    }
    throw errors.notFound('Course Not Found')
}

export const createCourse = async(course: Course, state: State): Promise<Course> => {
    const createdCourse = await coursesRepository.createCourse({ context: state.lmsCtx.contextId, ...course }, state)
    return createdCourse
}

export const updateCourseById = async(courseId: string, change: object, state: State): Promise<Course> => {
    await coursesRepository.updateCourseById(courseId, change, state)
    return getCourseById(courseId, state)
}
