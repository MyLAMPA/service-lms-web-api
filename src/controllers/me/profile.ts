
import { Request, Response } from 'express'
import * as _ from 'lodash'

import * as accessesServices from '../../services/accesses'
import * as usersServices from '../../services/users'

export async function getProfile(req: Request, res: Response) {
    return req.state.user
}

export async function putProfile(req: Request, res: Response) {
    return await usersServices.updateUserById(req.state.user._id, req.body, req.state)
}
