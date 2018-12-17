
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import { Model as ProfileModel } from '../../types/profile'

export const profile = {
    type: ProfileModel,
    args: {},
    async resolve(source, {}, { state }: Request) {
        return state.user
    },
}
