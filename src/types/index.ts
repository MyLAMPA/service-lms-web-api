
import * as Logger from 'bunyan'

import {
    IDCtx,
} from './identity'
import {
    LMSCtx,
} from './lms'

export type Partial<T> = {
    [P in keyof T]?: T[P]
}

export type State = {
    correlationId?: string
    logger?: Logger
    out?: any
    idCtx?: IDCtx
    lmsCtx?: LMSCtx
}
