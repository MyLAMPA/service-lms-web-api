
import * as _ from 'lodash'
import * as momnet from 'moment'

import {
    State,
} from '../../types'
import {
    Room,
} from '../../types/chat'
import * as roomsServices from './rooms'

export async function resolveChatContext(context: { ctxType: 'lesson'; ctxId: string; }, state: State): Promise<{ room: Room }> {
    const {
        ctxType, ctxId,
    } = context

    const ctx: string = `${ctxType}|${ctxId}`

    const room = await roomsServices.getOrCreateRoomByCtx(ctx, state)

    return { room }
}
