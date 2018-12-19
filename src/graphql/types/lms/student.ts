
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

export const Model = new GraphQLObjectType({
    name: 'Student',
    fields: {
        id: {
            type: GraphQLString,
            resolve(course) {
                if (course._id) {
                    return String(course._id)
                }
                return null
            },
        },
        email: {
            type: GraphQLString,
        },
        name: {
            type: GraphQLString,
        },
        fullName: {
            type: GraphQLString,
            async resolve(student) {
                return `${student.firstName} ${student.lastName}`
            },
        },
        firstName: {
            type: GraphQLString,
        },
        lastName: {
            type: GraphQLString,
        },
        abbr: {
            type: GraphQLString,
        },
        color: {
            type: GraphQLString,
        },
    },
})