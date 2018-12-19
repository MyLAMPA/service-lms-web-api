
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import {
    SchoolMembershipRole,
} from '../../../types/user'
import {
    LMSCtx,
} from '../../../types/lms'
import { Group } from '../../types'
import * as groupsServices from '../../../services/lms/groups'

export const group = {
    type: Group.Model,
    args: {
        id: {
            type: GraphQLString,
        },
    },
    async resolve(lmsCtx: LMSCtx, { id }, { state }: Request) {
        if (!_.isNil(id)) {
            const group = await groupsServices.getGroupById(id, state)
            return group
        }
        return null
    },
}

export const groups = {
    type: new GraphQLList(Group.Model),
    args: {},
    async resolve(lmsCtx: LMSCtx, {}, { state }: Request) {
        const searchParams: any = {
            school: lmsCtx.schoolId,
        }

        switch (lmsCtx.role) {
            case SchoolMembershipRole.admin:
            case SchoolMembershipRole.teacher:
            case SchoolMembershipRole.student:
                searchParams.students = { $in: [lmsCtx.userId] }
        }

        const groups = await groupsServices.getGroups(searchParams, state)
        return groups
    },
}
