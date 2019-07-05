
import * as _ from 'lodash'

export const normalizeEmailAddress = (email: string): string => {
    const normalizedEmailAddress = email
        .toLowerCase()
        .replace(/\s/g, '')
    return normalizedEmailAddress
}
