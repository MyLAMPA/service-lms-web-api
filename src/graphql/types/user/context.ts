
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

import { profile } from '../../resolvers/user/profile'
import { schoolMemberships } from '../../resolvers/user/schoolMemberships'

export const Context = new GraphQLObjectType({
    name: 'UserContext',
    fields: {
        profile,
        schoolMemberships,
    },
})
