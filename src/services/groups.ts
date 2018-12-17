
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors } from '../errors'
import {
    State,
    Group,
} from '../models'
import { groupsRepository } from '../repositories'

export async function getGroupsWithCourse(params: object, state: State) {
    const groups = await groupsRepository.getGroups(params, true, state)
    return groups
}

export async function getGroups(params: object, state: State) {
    const groups = await groupsRepository.getGroups(params, false, state)
    return groups
}

export async function getGroupById(groupId: string, state: State): Promise<Group> {
    const group = await groupsRepository.getGroupById(groupId, state)
    if (group) {
        return group
    }
    throw errors.notFound('Group Not Found')
}

export async function createGroup(group: Group, state: State): Promise<Group> {
    const document = _.merge(
        {},
        _.pick(group, ['course', 'name', 'abbr', 'description', 'capacity', 'students', 'color']),
        { school: state.school._id }
    )
    const createdGroup = await groupsRepository.createGroup(document, state)
    return createdGroup
}

export async function updateGroupById(groupId: string, change: object, state: State): Promise<Group> {
    return await groupsRepository.updateGroupById(groupId, change, state)
}
