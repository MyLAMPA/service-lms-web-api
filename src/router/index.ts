
import {
    Router,
    Request,
    Response,
    NextFunction,
} from 'express'
import * as _ from 'lodash'

import { httpErrors as errors } from '../errors'
import { router as apiRouter } from './api'

const router = Router()

router
    .use(async function (req: Request, res: Response, next: NextFunction) {
        res.set('Access-Control-Allow-Origin', '*')
        res.set('Access-Control-Allow-Headers', 'content-type, authorization, x-correlation-id')
        res.set('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE, HEAD')
        next()
    })

router
    .route('*')
    .options(async function (req: Request, res: Response, next: NextFunction) {
        try {
            return res.json({ status: 'ok' })
        } catch (err) {
            return next(err)
        }
    })

router.use('/api', apiRouter)

router
    .route('*')
    .all(async function (req: Request, res: Response, next: NextFunction) {
        try {
            if (req.state.out === undefined) {
                throw errors.notFound()
            }
            return next()
        } catch (err) {
            return next(err)
        }
    })

export { router }
