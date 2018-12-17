
import * as _ from 'lodash'

import { httpErrors as errors } from '../errors'
import {
    State,
    Group,
} from '../models'
import * as source from './mongo/source'

export async function getGroups(params: object, populateCourse: boolean, state: State) {
    let groupsExec = source.groups.find(params)

    if (populateCourse) {
        groupsExec = groupsExec.populate('course')
    }

    const groups = await groupsExec
    return groups
        .filter(group => !_.isEmpty(group))
        .map(group => <Group>group)
}

export async function getGroupById(groupId: string, state: State): Promise<Group> {
    const group = await source.groups.findById(groupId)
    if (!_.isEmpty(group)) {
        return group
    }
    return null
}

export async function createGroup(document: Group, state: State): Promise<Group> {
    const createdGroup = await source.groups.create(document)
    return createdGroup
}

export async function updateGroupById(groupId: string, change: object, state: State): Promise<Group> {
    await source.groups.findByIdAndUpdate(groupId, change)
    return getGroupById(groupId, state)
}
