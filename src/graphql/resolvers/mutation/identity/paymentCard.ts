
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import { httpErrors } from '../../../../errors'
import {
    IDCtx,
} from '../../../../types'
import {
    Model as PaymentCardModel,
} from '../../../types/paymentCard'
import * as paymentCardsServices from '../../../../services/identity/paymentCards'

export const updatePaymentCard = {
    type: PaymentCardModel,
    args: {
        stripeTokenId: {
            type: GraphQLString,
        },
    },
    async resolve({ userId }: IDCtx, { stripeTokenId }, { state }: Request) {
        await paymentCardsServices.updateUserPaymentCard(userId, stripeTokenId, state)
        return await paymentCardsServices.getPaymentCard(userId, state)
    },
}
