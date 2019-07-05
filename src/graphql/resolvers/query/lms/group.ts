
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import {
    LMSCtx,
    LMSContextMembershipRole,
} from '../../../../types'
import { Model as GroupModel } from '../../../types/lms/group'
import * as groupsServices from '../../../../services/lms/groups'

export const group = {
    type: GroupModel,
    args: {
        id: {
            type: GraphQLString,
        },
    },
    async resolve({ role }: LMSCtx, { id }, { state }: Request) {
        if (!_.isNil(id)) {
            const group = await groupsServices.getGroupById(id, state)
            return group
        }
        return null
    },
}

export const groups = {
    type: new GraphQLList(GroupModel),
    args: {},
    async resolve({ role, studentId, contextId: context }: LMSCtx, {}, { state }: Request) {
        const searchParams: any = { context }

        switch (role) {
            case LMSContextMembershipRole.admin:
            case LMSContextMembershipRole.teacher:
            case LMSContextMembershipRole.student:
                searchParams.students = { $in: [studentId] }
        }

        const groups = await groupsServices.getGroups(searchParams, state)
        return groups
    },
}
