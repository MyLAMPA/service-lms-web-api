
import { Request } from 'express'
import {
    GraphQLBoolean,
    GraphQLEnumType,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'
import * as moment from 'moment'

export const Model = new GraphQLObjectType({
    name: 'SchoolYear',
    fields: {
        id: {
            type: GraphQLString,
            resolve(schoolYear) {
                if (schoolYear._id) {
                    return String(schoolYear._id)
                }
                return null
            },
        },
        title: {
            type: GraphQLString,
        },
        start: {
            type: GraphQLString,
            resolve(schoolYear) {
                if (!_.isNil(schoolYear.start)) {
                    return moment(schoolYear.start).toISOString()
                }
                return null
            },
        },
        end: {
            type: GraphQLString,
            resolve(schoolYear) {
                if (!_.isNil(schoolYear.end)) {
                    return moment(schoolYear.end).toISOString()
                }
                return null
            },
        },
    },
})
