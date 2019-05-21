
import { JsonError } from './JsonError'

export class NotFoundError extends JsonError {
    constructor(message: string, errorCode: number = null) {
        super(message, 404, errorCode)
    }
}
