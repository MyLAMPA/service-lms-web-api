
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

export const Model = new GraphQLInputObjectType({
    name: 'Pagination',
    fields: {
        offset: {
            type: GraphQLInt,
        },
        size: {
            type: GraphQLInt,
        },
    },
})
