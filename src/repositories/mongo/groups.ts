
import * as _ from 'lodash'

import { config } from '../../config'
import {
    State,
    Group,
} from '../../models'
import { source } from './source'
import { groupSchema, GroupName } from './schemas/group'

const groupsCollection = source.collection<Group>(
    GroupName,
    groupSchema,
    `${config.mongoose.tablePrefix ? config.mongoose.tablePrefix + '-' : ''}groups`
)

export async function getGroups(params: object, populateCourse: boolean, state: State) {
    let groupsExec = groupsCollection.find(params)

    if (populateCourse) {
        groupsExec = groupsExec.populate('course')
    }

    const groups = await groupsExec
    return groups
        .filter(group => !_.isEmpty(group))
        .map(group => <Group>group)
}

export async function getGroupById(groupId: string, state: State): Promise<Group> {
    const group = await groupsCollection.findById(groupId)
    if (!_.isEmpty(group)) {
        return group
    }
    return null
}

export async function createGroup(document: Group, state: State): Promise<Group> {
    const createdGroup = await groupsCollection.create(document)
    return createdGroup
}

export async function updateGroupById(groupId: string, change: object, state: State): Promise<Group> {
    await groupsCollection.findByIdAndUpdate(groupId, change)
    return getGroupById(groupId, state)
}
