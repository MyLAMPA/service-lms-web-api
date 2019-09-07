
import * as _ from 'lodash'
import * as moment from 'moment'
import { Request } from 'express'
import {
    GraphQLBoolean,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'

export const Model = new GraphQLObjectType({
    name: 'Library_Outcome',
    fields: {
        key: {
            type: GraphQLString,
        },
        name: {
            type: GraphQLString,
        },
        text: {
            type: GraphQLString,
        },
    },
})
