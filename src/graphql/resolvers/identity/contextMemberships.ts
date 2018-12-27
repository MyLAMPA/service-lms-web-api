
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import {
    IDCtx,
} from '../../../types'
import { Model as ContextMembershipModel } from '../../types/identity/contextMembership'
import * as contextMembershipsServices from '../../../services/contextMemberships'

export const contextMemberships = {
    type: new GraphQLList(ContextMembershipModel),
    args: {},
    async resolve({ userId }: IDCtx, {}, { state }: Request) {
        const contextMemberships = await contextMembershipsServices.getActiveUserMembershipsWithContext(userId, state)
        return contextMemberships
    },
}
