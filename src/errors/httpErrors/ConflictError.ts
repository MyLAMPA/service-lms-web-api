
import { JsonError } from './JsonError'

export class ConflictError extends JsonError {
    constructor(message: string, errorCode: number = null) {
        super(message, 409, errorCode)
    }
}