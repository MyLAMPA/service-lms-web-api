
import { JsonError } from './JsonError'

export class ServerError extends JsonError {
    constructor(message: string, errorCode: number = null) {
        super(message, 500, errorCode)
    }
}
