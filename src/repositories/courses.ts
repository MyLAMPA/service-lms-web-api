
import * as _ from 'lodash'

import {
    State,
    Course,
} from '../models'
import * as source from '../repositories/mongo/source'

export async function getCourses(params: object, state: State): Promise<Course[]> {
    const courses = await source.courses.find(params)
    return courses
        .filter(course => !_.isEmpty(course))
        .map(course => <Course>course)
}

export async function getCourseById(courseId: string, state: State): Promise<Course> {
    const course = await source.courses.findById(courseId).lean()
    if (!_.isEmpty(course)) {
        return course
    }
    return null
}

export async function createCourse(document: Course, state: State): Promise<Course> {
    const createdCourse = await source.courses.create(document)
    return createdCourse
}

export async function updateCourseById(courseId: string, change: object, state: State): Promise<void> {
    await source.courses.findByIdAndUpdate(courseId, change)
}
