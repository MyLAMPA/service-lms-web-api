
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import { httpErrors } from '../../../../errors'
import { Model as UserModel } from '../../../types/identity/user'
import * as usersServices from '../../../../services/users'

export const user = {
    type: UserModel,
    args: {
        username: {
            type: GraphQLString,
        },
    },
    async resolve(source, { username }, { state }: Request) {
        if (state.idCtx.virtual) {
            throw httpErrors.unauthorized('Unauthorized Request')
        }

        const user = await usersServices.getByUsername(username, state)
        return _.pick(user, [
            'id',
            'username',
            'name',
            'firstName',
            'lastName',
            'image',
        ])
    },
}
