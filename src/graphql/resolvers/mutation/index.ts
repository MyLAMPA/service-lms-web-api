
import {
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'

import { identity } from './identity'
import { library } from './library'

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        identity,
        library,
    },
})

export { mutation }
