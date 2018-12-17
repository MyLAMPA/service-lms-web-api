
import { Request } from 'express'
import {
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'

import { Profile } from '../../types'

export const myProfile = {
    type: Profile.Model,
    async resolve(source, {}, { state }: Request) {
        return state.user
    },
}
