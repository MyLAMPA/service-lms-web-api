
import * as _ from 'lodash'

export class Pagination {
    public static parse(options): Pagination {
        const pagination = new Pagination()

        if (typeof _.get(options, 'size') === 'number') {
            pagination.size = options.size
        }

        if (typeof _.get(options, 'offset') === 'number') {
            pagination.offset = options.offset
        }
        
        return pagination
    }

    private _size: number = 20
    private _offset: number = 0

    constructor(size: number = 20, offset: number = 0) {
        this._size = size
        this._offset = offset
    }

    public get size(): number { return this._size }
    public set size(size: number) {
        this._size = size
    }

    public get offset(): number { return this._offset }
    public set offset(offset: number) {
        this._offset = offset
        if (this._offset < 0) {
            this._offset = 0
        }
    }

    public opaque(): string {
        const str = `${this.size}:${this.offset}`
        return Buffer.from(str).toString('base64')
    }

    public next(): Pagination {
        return new Pagination(this.size, this.offset + this.size)
    }

    public previous(): Pagination {
        if (this.offset < 1) {
            return null
        }

        return new Pagination(this.size, this.offset - this.size)
    }
}
