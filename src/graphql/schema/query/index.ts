
import {
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'

import { identity } from './identity'
import { lms } from './lms'
import { chat } from './chat'

const query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        identity,
        lms,
        chat,
    },
})

export { query }
