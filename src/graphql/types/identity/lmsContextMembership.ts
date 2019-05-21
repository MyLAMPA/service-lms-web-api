
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

import { LMSContextMembershipRoleEnum } from '../enums'
import { Model as ContextModel } from '../lms/context'
import * as lmsContextsServices from '../../../services/lmsContexts'

export const Model = new GraphQLObjectType({
    name: 'Identity_LMSContextMembership',
    fields: {
        id: {
            type: GraphQLString,
            resolve: ({ _id }) => _id ? String(_id) : null,
        },
        context: {
            type: ContextModel,
            async resolve(lmsContextMembership, {}, { state }: Request) {
                if (typeof lmsContextMembership.context === 'string' || _.get(lmsContextMembership.context, '_bsontype') === 'ObjectID') {
                    const lmsContext = await lmsContextsServices.getLMSContextById(lmsContextMembership.lmsContext, state)
                    return lmsContext
                }
                if (lmsContextMembership.lmsContext) {
                    return lmsContextMembership.lmsContext
                }
                return null
            },
        },
        role: {
            type: LMSContextMembershipRoleEnum,
        },
    },
})
