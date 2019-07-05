
export interface QueryResponse<Source extends object = any> {
    took: number
    timed_out: false
    _shards: {
        total: number
        successful: number
        skipped: number
        failed: number
    }
    hits: {
        total: number
        max_score: number
        hits: {
            _index: string
            _type: string
            _id: string
            _score: number
            _source: Source
        }[]
    }
}
