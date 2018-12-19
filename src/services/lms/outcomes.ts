
import { v4 as uuidv4 } from 'uuid'
import * as _ from 'lodash'

import {
    State,
} from '../../types'
import {
//     BaseOutcome,
//     Outcome,
} from '../../types/lms'

// export async function prepareForSave(outcome: BaseOutcome, state: State): Promise<BaseOutcome>
// export async function prepareForSave(outcome: Outcome, state: State): Promise<Outcome>
// export async function prepareForSave(outcome: BaseOutcome|Outcome, state: State): Promise<BaseOutcome|Outcome> {
export async function prepareForSave(outcome: any, state: State): Promise<any> {
    if (
        !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(outcome.key) &&
        !/^\{?[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}‌​\}?$/.test(outcome.key)
    ) {
        outcome.key = uuidv4()
    }
    return outcome
}
