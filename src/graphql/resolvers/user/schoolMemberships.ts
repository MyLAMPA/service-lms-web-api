
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import { Model as SchoolMembershipModel } from '../../types/user/schoolMembership'
import * as schoolMembershipsServices from '../../../services/schoolMemberships'

export const schoolMemberships = {
    type: new GraphQLList(SchoolMembershipModel),
    args: {},
    async resolve(source, {}, { state }: Request) {
        const schoolMemberships = await schoolMembershipsServices.getActiveUserMembershipsWithSchool(state.user._id, state)
        return schoolMemberships
    },
}
