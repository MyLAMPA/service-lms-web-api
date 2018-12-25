
import * as _ from 'lodash'

import { config } from '../../config'
import {
    State,
    Course,
} from '../../types'
import { source } from './source'
import { courseSchema, CourseName } from './schemas/course'

const coursesCollection = source.collection<Course>(
    CourseName,
    courseSchema,
    `${config.mongoose.tablePrefix ? config.mongoose.tablePrefix + '-' : ''}courses`
)

export async function getCourses(params: object, state: State): Promise<Course[]> {
    const courses = await coursesCollection.find(params)
    return courses
        .filter(course => !_.isEmpty(course))
        .map(course => <Course>course)
}

export async function getCourseById(courseId: string, state: State): Promise<Course> {
    const course = await coursesCollection.findById(courseId).lean()
    if (!_.isEmpty(course)) {
        return course
    }
    return null
}

export async function createCourse(document: Course, state: State): Promise<Course> {
    const createdCourse = await coursesCollection.create(document)
    return createdCourse
}

export async function updateCourseById(courseId: string, change: object, state: State): Promise<void> {
    await coursesCollection.findByIdAndUpdate(courseId, change)
}
