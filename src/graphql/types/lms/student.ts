
import { Request } from 'express'
import {
    GraphQLBoolean,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
} from 'graphql'
import * as _ from 'lodash'

import * as lmsContextMembershipsServices from '../../../services/lms/lmsContextMemberships'

export const Model = new GraphQLObjectType({
    name: 'Student',
    fields: {
        id: {
            type: GraphQLString,
            resolve: ({ _id }) => _id ? String(_id) : null,
        },
        fullName: {
            type: GraphQLString,
        },
        // email: {
        //     type: GraphQLString,
        //     async resolve(student, {}, { state }: Request) {
        //         lmsContextMembershipsServices.getCurrentUserActiveMemberships
        //     },
        // },
    },
})

export const CreateModel = new GraphQLInputObjectType({
    name: 'CreateStudent',
    fields: {
        email: {
            type: GraphQLString,
        },
        fullName: {
            type: new GraphQLNonNull(GraphQLString),
        },
    },
})
