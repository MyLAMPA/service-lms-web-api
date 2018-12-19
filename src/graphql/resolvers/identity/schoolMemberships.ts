
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import {
    IDCtx,
} from '../../../types/identity'
import { Model as SchoolMembershipModel } from '../../types/identity/schoolMembership'
import * as schoolMembershipsServices from '../../../services/identity/schoolMemberships'

export const schoolMemberships = {
    type: new GraphQLList(SchoolMembershipModel),
    args: {},
    async resolve({ userId }: IDCtx, {}, { state }: Request) {
        const schoolMemberships = await schoolMembershipsServices.getActiveUserMembershipsWithSchool(userId, state)
        return schoolMemberships
    },
}
