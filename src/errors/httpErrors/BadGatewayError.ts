
import { JsonError } from './JsonError'

export class BadGatewayError extends JsonError {
    constructor(message: string, errorCode: number = null) {
        super(message, 502, errorCode)
    }
}
