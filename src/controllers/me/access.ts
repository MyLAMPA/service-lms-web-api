
import { Request, Response } from 'express'
import * as _ from 'lodash'

import * as accessesServices from '../../services/accesses'

export async function getAccess(req: Request, res: Response) {
    return req.state.access
}
