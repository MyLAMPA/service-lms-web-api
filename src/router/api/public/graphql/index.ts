
import { Router } from 'express'
import * as graphqlHTTP from 'express-graphql'

import { schema as graphQLSchema } from '../../../../graphql/schema'

const router = Router()

router.use(graphqlHTTP({
    schema: graphQLSchema,
    graphiql: true,
}))

export { router }
