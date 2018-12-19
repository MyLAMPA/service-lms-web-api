
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors } from '../errors'
import {
    State,
    Group,
} from '../models'
import { groupsRepository } from '../repositories'

export async function getGroupsWithCourse(params: object, state: State) {
    throw errors.serverError('deprached api')
}

export async function getGroups(params: object, state: State) {
    throw errors.serverError('deprached api')
}

export async function getGroupById(groupId: string, state: State): Promise<Group> {
    throw errors.serverError('deprached api')
}

export async function createGroup(group: Group, state: State): Promise<Group> {
    throw errors.serverError('deprached api')
}

export async function updateGroupById(groupId: string, change: object, state: State): Promise<Group> {
    throw errors.serverError('deprached api')
}
