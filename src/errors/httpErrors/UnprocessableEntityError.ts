
import { JsonError } from './JsonError'

export class UnprocessableEntityError extends JsonError {
    constructor(message: string, errorCode: number = null) {
        super(message, 422, errorCode)
    }
}