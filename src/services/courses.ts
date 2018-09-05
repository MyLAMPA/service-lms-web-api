
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors } from '../errors'
import {
    State,
    Course,
} from '../models'
import * as db from '../repositories/mongo'

export async function getCourses(params: object, state: State): Promise<Course[]> {
    const courses = await db.courses.find(params).lean()
    return courses
}

export async function getCourseById(courseId: string, state: State): Promise<Course> {
    const course = await db.courses.findById(courseId).lean()
    if (!_.isNil(course)) {
        return course
    }
    throw errors.notFound('Course Not Found')
}

export async function createCourse(course: Course, state: State): Promise<Course> {
    const _course = _.merge(
        {},
        _.pick(course, ['name', 'abbr', 'description', 'color']),
        { school: state.school._id }
    )
    const createdCourse = await db.courses.create(_course)
    return createdCourse.toObject()
}

export async function updateCourseById(courseId: string, change: object, state: State): Promise<Course> {
    await db.courses.findByIdAndUpdate(courseId, change)
    return getCourseById(courseId, state)
}
