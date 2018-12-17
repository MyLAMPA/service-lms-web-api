
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
    name: 'Course',
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
        // school: {
        //     type: SchoolModel,
        //     async resolve() {},
        // },
        name: {
            type: GraphQLString,
        },
        abbr: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        color: {
            type: GraphQLString,
        },
    },
})
