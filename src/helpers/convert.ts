
import * as _ from 'lodash'

export function toBuffer(value: any): Buffer {
    if (value.type === 'Buffer') {
        return new Buffer(value.data)
    }
    
    return value
}

export function toBoolean(value: any): boolean {
    if (typeof value === 'boolean') {
        return value
    } else if (typeof value === 'string') {
        if (value.toLowerCase() === 'false' || value.toLowerCase() === '0' || value.toLowerCase() === 'f') {
            return false
        }
        return true
    } else if (typeof value === 'number') {
        if (value === 0) {
            return false
        }
        return true
    } else if (_.isNil(value) || value === void 0) {
        return false
    }
    return true
}