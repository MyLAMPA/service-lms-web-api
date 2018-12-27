
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

import { user } from '../../resolvers/identity/user'
import { contextMemberships } from '../../resolvers/identity/contextMemberships'
import { mySubscriptions } from '../../resolvers/identity/mySubscriptions'

export const Context = new GraphQLObjectType({
    name: 'IdentityContext',
    fields: {
        user,
        contextMemberships,
        mySubscriptions,
    },
})
