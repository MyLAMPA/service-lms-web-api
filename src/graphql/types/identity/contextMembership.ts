
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

import { ContextMembershipRoleEnum } from '../enums'
import { Model as ContextModel } from '../lms/context'
import * as contextServices from '../../../services/context'

export const Model = new GraphQLObjectType({
    name: 'ContextMembership',
    fields: {
        id: {
            type: GraphQLString,
            resolve: ({ _id }) => _id ? String(_id) : null,
        },
        context: {
            type: ContextModel,
            async resolve(contextMembership, {}, { state }: Request) {
                if (typeof contextMembership.context === 'string' || _.get(contextMembership.context, '_bsontype') === 'ObjectID') {
                    const context = await contextServices.getContextById(contextMembership.context, state)
                    return context
                }
                if (contextMembership.context) {
                    return contextMembership.context
                }
                return null
            },
        },
        role: {
            type: ContextMembershipRoleEnum,
        },
    },
})
