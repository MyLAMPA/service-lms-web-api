
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
    GraphQLNonNull,
} from 'graphql'
import * as _ from 'lodash'

import { httpErrors } from '../../../../errors'
import {
    LMSCtx,
    LmsContextMembershipRole,
} from '../../../../types'
import {
    Model as LocationModel,
    CreateModel as CreateLocationModel,
} from '../../../types/lms/location'
import * as locationsServices from '../../../../services/lms/locations'

export const createLocation = {
    type: LocationModel,
    args: {
        location: {
            type: new GraphQLNonNull(CreateLocationModel),
        },
    },
    async resolve({ role, contextId: context }: LMSCtx, { location }, { state }: Request) {
        switch (role) {
            case LmsContextMembershipRole.admin:
            case LmsContextMembershipRole.freelancer:
                const createdLocation = await locationsServices.createLocation(location, state)
                return createdLocation
        }

        throw httpErrors.unauthorized('Unauthorized To Create Location')
    },
}
