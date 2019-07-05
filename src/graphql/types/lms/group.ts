
import { Request } from 'express'
import {
    GraphQLBoolean,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import { Model as CourseModel } from './course'
import { Model as StudentModel } from './student'
import * as coursesServices from '../../../services/lms/courses'
import * as studentsServices from '../../../services/lms/students'

export const Model = new GraphQLObjectType({
    name: 'Group',
    fields: {
        id: {
            type: GraphQLString,
            resolve: ({ _id }) => _id ? String(_id) : null,
        },
        course: {
            type: CourseModel,
            async resolve(group, {}, { state }: Request) {
                if (typeof group.course === 'string' || _.get(group.course, '_bsontype') === 'ObjectID') {
                    const course = await coursesServices.getCourseById(group.course, state)
                    return course
                }
                if (group.course) {
                    return group.course
                }
                return null
            },
        },
        name: {
            type: GraphQLString,
        },
        abbr: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        capacity: {
            type: GraphQLInt,
        },
        students: {
            type: new GraphQLList(StudentModel),
            async resolve(group, {}, { state }: Request) {
                const students = []
                if (_.isArray(group.students)) {
                    for (let i = 0; i < group.students.length; i += 1) {
                        const item = group.students[i]
                        if (typeof item === 'string' || _.get(item, '_bsontype') === 'ObjectID') {
                            students.push(await studentsServices.getStudentById(item, state))
                            continue
                        }
                        if (item) {
                            students.push(item)
                            continue
                        }
                    }
                }
                return students
            },
        },
        color: {
            type: GraphQLString,
        },
    },
})
