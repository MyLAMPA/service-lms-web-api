
export class JsonError extends Error {
    name: string;
    message: string;
    httpStatus: number;
    errorCode: number;

    constructor(message: string, httpStatus: number, errorCode: number) {
        super(message)

        this.name = this.constructor.name
        this.httpStatus = httpStatus
        this.errorCode = errorCode
    }
}
