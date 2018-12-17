
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import * as Message from '../../../types/chat/message'

export const message = {
    type: Message.Model,
    args: {
        id: {
            type: GraphQLString,
        },
    },
    async resolve(source, args, { state }: Request) {
        if (!_.isNil(args.id)) {
            const message = {} // await coursesServices.getCourseById(args.id, state)
            return message
        }
        return null
    },
}
