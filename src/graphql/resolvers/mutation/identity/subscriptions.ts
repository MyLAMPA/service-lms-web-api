

import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
    GraphQLNonNull,
} from 'graphql'
import * as _ from 'lodash'

import {
    IDCtx,
} from '../../../../types'
import { LMSContextModeEnum } from '../../../types/enums'
import { Model as LmsContextModel } from '../../../types/lms/context'
import { CreateModel as CreateSchoolYearModel } from '../../../types/lms/schoolYear'
import * as subscriptionsServices from '../../../../services/identity/subscriptions'

export const subscribeLms = {
    type: LmsContextModel,
    args: {
        mode: {
            type: new GraphQLNonNull(LMSContextModeEnum),
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        schoolYear: {
            type: CreateSchoolYearModel,
        },
    },
    async resolve({}: IDCtx, { mode, name, schoolYear }, { state }: Request) {
        await subscriptionsServices.subscribeLms(state)
        return
    },
}
