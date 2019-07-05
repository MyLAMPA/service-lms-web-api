
import * as _ from 'lodash'
import * as joi from 'joi'

export class ProseMirrorDocument {
    public static async ValidateJson(jsonDocument: string): Promise<object> {
        try {
            const doc = JSON.parse(jsonDocument)
            if (doc.type.toLowerCase() !== 'doc') {
                throw Error('Unknown type')
            }
            if (typeof doc.version !== 'number' &&
                typeof doc.version !== 'string') {
                throw Error('Document version is not specefied')
            }
            return doc
        } catch (err) {
            throw err
        }
    }
}
