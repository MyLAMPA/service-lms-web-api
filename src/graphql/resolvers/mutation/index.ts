
import {
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'

import { identity } from './identity'
import { library } from './library'
import { lms } from './lms'

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        identity,
        library,
        lms,
    },
})

export { mutation }
