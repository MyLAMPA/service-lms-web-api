
import { JsonError } from './JsonError'

export class ForbiddenError extends JsonError {
    constructor(message: string, errorCode: number = null) {
        super(message, 403, errorCode)
    }
}
