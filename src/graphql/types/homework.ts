
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
import * as moment from 'moment'

import { LessonStatusEnum } from './enums'
import * as lessonsServices from '../../services/lms/lessons'

export const DueLessonModel = new GraphQLObjectType({
    name: 'DueLesson',
    fields: {
        id: {
            type: GraphQLString,
            resolve(dueLesson) {
                if (dueLesson._id) {
                    return String(dueLesson._id)
                }
                return null
            },
        },
        start: {
            type: GraphQLString,
            resolve(dueLesson) {
                if (!_.isNil(dueLesson.start)) {
                    return moment(dueLesson.start).toISOString()
                }
                return null
            },
        },
        end: {
            type: GraphQLString,
            resolve(dueLesson) {
                if (!_.isNil(dueLesson.end)) {
                    return moment(dueLesson.end).toISOString()
                }
                return null
            },
        },
        status: {
            type: LessonStatusEnum,
        },
    },
})

export const OriginLessonModel = new GraphQLObjectType({
    name: 'OriginLesson',
    fields: {
        id: {
            type: GraphQLString,
            resolve(originLesson) {
                if (originLesson._id) {
                    return String(originLesson._id)
                }
                return null
            },
        },
        start: {
            type: GraphQLString,
            resolve(originLesson) {
                if (!_.isNil(originLesson.start)) {
                    return moment(originLesson.start).toISOString()
                }
                return null
            },
        },
        end: {
            type: GraphQLString,
            resolve(originLesson) {
                if (!_.isNil(originLesson.end)) {
                    return moment(originLesson.end).toISOString()
                }
                return null
            },
        },
        status: {
            type: LessonStatusEnum,
        },
    },
})

export const Model = new GraphQLObjectType({
    name: 'Homework',
    fields: {
        id: {
            type: GraphQLString,
            resolve(homework) {
                if (homework._id) {
                    return String(homework._id)
                }
                return null
            },
        },
        dueLesson: {
            type: DueLessonModel,
            async resolve(homework, {}, { state }: Request) {
                if (typeof homework.dueLesson === 'string' || _.get(homework.dueLesson, '_bsontype') === 'ObjectID') {
                    const dueLesson = await lessonsServices.getLessonById(homework.dueLesson, state)
                    return dueLesson
                }
                if (homework.dueLesson) {
                    return homework.dueLesson
                }
                return null
            },
        },
        originLesson: {
            type: OriginLessonModel,
            async resolve(homework, {}, { state }: Request) {
                if (typeof homework.originLesson === 'string' || _.get(homework.originLesson, '_bsontype') === 'ObjectID') {
                    const originLesson = await lessonsServices.getLessonById(homework.originLesson, state)
                    return originLesson
                }
                if (homework.originLesson) {
                    return homework.originLesson
                }
                return null
            },
        },
        title: {
            type: GraphQLString,
        },
        assignment: {
            type: GraphQLString,
        },
        isDone: {
            type: GraphQLBoolean,
        },
    },
})
