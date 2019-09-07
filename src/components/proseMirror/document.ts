
import * as _ from 'lodash'
import * as joi from 'joi'

const iritateContent = (item: any[]): string => {
    const lines = []
    for (const i in item) {
        if (typeof _.get(item[i], 'text') === 'string') {
            lines.push(item[i].text)
        }
        if (_.isArray(_.get(item[i], 'content'))) {
            lines.push(iritateContent(item[i].content))
        }
    }
    return lines.join('\n')
}

export class ProseMirrorDocument {
    private document: object

    private static ParseRawJsonString(jsonDocument: string): object {
        try {
            const document = JSON.parse(jsonDocument)
            if (document.type.toLowerCase() !== 'doc') {
                throw Error('Unknown type')
            }
            if (typeof document.version !== 'number' &&
                typeof document.version !== 'string') {
                throw Error('Document version is not specefied')
            }
            return document
        } catch (err) {
            throw err
        }
    }

    public static ParseFromJsonString(jsonDocument: string): ProseMirrorDocument {
        return new ProseMirrorDocument(ProseMirrorDocument.ParseRawJsonString(jsonDocument))
    }

    constructor(document: object) {
        this.document = document
    }

    public getStringifiedJsonValue(): string {
        return JSON.stringify(this.document)
    }

    public extractPureText(): string {
        if (_.isArray(_.get(this.document, 'content'))) {
            return iritateContent(_.get(this.document, 'content'))
        }
        return null
    }
}
