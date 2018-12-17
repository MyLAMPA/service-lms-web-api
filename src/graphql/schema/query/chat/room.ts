
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import * as Room from '../../../types/chat/room'

export const room = {
    type: Room.Model,
    args: {
        id: {
            type: GraphQLString,
        },
    },
    async resolve(source, args, { state }: Request) {
        if (!_.isNil(args.id)) {
            const room = {} // await coursesServices.getCourseById(args.id, state)
            return room
        }
        return null
    },
}
