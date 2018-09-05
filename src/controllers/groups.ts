
import { Request, Response } from 'express'
import * as _ from 'lodash'

import { httpErrors as errors } from '../errors'
import { toBoolean } from '../helpers/convert'
import {
    UserRole,
} from '../models'
import * as groupsServices from '../services/groups'

export async function getGroups(req: Request, res: Response) {
    let query = null
    const populateCourse = toBoolean(req.query.populateCourse)

    switch (req.state.activeRole) {
        case UserRole.admin:
        case UserRole.teacher:
            query = { school: req.state.school._id }
            break
        default:
            throw errors.forbidden('Forbidden Groups')
    }

    const groups = await groupsServices.getGroups(query, populateCourse, req.state)
    return groups
}

export async function postGroups(req: Request, res: Response) {
    const group = await groupsServices.createGroup(req.body, req.state)
    return group
}

export async function getGroup(req: Request, res: Response) {
    switch (req.state.activeRole) {
        case UserRole.admin:
        case UserRole.teacher:
            const group = await groupsServices.getGroupById(req.params.groupId, req.state)
            if (String(group.school) === String(req.state.school._id)) {
                return group
            }
        default:
            break
    }

    throw errors.forbidden('Forbidden Group')
}

export async function putGroup(req: Request, res: Response) {
    const groupId = req.params.groupId
    const group = await groupsServices.getGroupById(groupId, req.state)
    
    if (String(group.school) === String(req.state.school._id)) {
        const change = { $set: _.pick(req.body, ['course', 'name', 'abbr', 'description', 'capacity', 'students', 'color']) }
        return await groupsServices.updateGroupById(groupId, change, req.state)
    }

    throw errors.forbidden('Forbidden Group')
}
