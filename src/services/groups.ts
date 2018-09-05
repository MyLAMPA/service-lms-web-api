
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors } from '../errors'
import {
    State,
    Group,
} from '../models'
import * as db from '../repositories/mongo'

export async function getGroups(params: object, populateCourse: boolean, state: State) {
    const groupsExec = db.groups.find(params)
    if (populateCourse) {
        groupsExec.populate('course')
    }
    const groups = await groupsExec.lean()
    return groups
}

export async function getGroupById(groupId: string, state: State): Promise<Group> {
    const group = await db.groups.findById(groupId).lean()
    if (!_.isNil(group)) {
        return group
    }
    throw errors.notFound('Group Not Found')
}

export async function createGroup(group: Group, state: State): Promise<Group> {
    const _group = _.merge(
        {},
        _.pick(group, ['course', 'name', 'abbr', 'description', 'capacity', 'students', 'color']),
        { school: state.school._id }
    )
    const createdGroup = await db.groups.create(_group)
    return createdGroup.toObject()
}

export async function updateGroupById(groupId: string, change: object, state: State): Promise<Group> {
    await db.groups.findByIdAndUpdate(groupId, change)
    return getGroupById(groupId, state)
}
