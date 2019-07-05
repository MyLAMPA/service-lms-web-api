
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import {
    IDCtx,
} from '../../../../types'
import { Model as LMSContextMembershipModel } from '../../../types/identity/lmsContextMembership'
import * as lmsContextMembershipsServices from '../../../../services/lms/lmsContextMemberships'

export const lmsContextMemberships = {
    type: new GraphQLList(LMSContextMembershipModel),
    args: {},
    async resolve({ userId, emailAddresses }: IDCtx, {}, { state }: Request) {
        const lmsContextMemberships =
            await lmsContextMembershipsServices.getCurrentUserActiveMemberships(state)
        return lmsContextMemberships
    },
}
