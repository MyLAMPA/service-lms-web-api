
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
    name: 'LocationEquipment',
    fields: {
        id: {
            type: GraphQLString,
            resolve: ({ _id }) => _id ? String(_id) : null,
        },
        title: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
    },
})
