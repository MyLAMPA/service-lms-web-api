
import { Router } from 'express'
import * as graphqlHTTP from 'express-graphql'

import { schema as graphQLSchema } from '../../../../graphql/schema'
import { parseGraphqlError } from '../../../../middlewares'

const router = Router()

router.use(graphqlHTTP({
    schema: graphQLSchema,
    graphiql: true,
    formatError: parseGraphqlError,
}))

export { router }
