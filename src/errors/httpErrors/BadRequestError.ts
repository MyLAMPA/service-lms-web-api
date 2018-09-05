
import { JsonError } from './JsonError'

export class BadRequestError extends JsonError {
    constructor(message: string, errorCode: number = null) {
        super(message, 400, errorCode)
    }
}