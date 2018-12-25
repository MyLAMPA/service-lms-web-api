
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import {
    IDCtx,
} from '../../../types'
import { Model as UserModel } from '../../types/identity/user'
import * as usersServices from '../../../services/users'

export const user = {
    type: UserModel,
    args: {},
    async resolve({ userId }: IDCtx, {}, { state }: Request) {
        const user = await usersServices.getUserById(userId, state)
        return user
    },
}
