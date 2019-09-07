
import * as _ from 'lodash'

import { ProseMirrorDocument } from '../proseMirror/document'

export class Document {
    public static ParseProseMirrorJson(jsonString: string): Document {
        return new Document(ProseMirrorDocument.ParseFromJsonString(jsonString))
    }

    private proseMirrorDocument: ProseMirrorDocument
    constructor(proseMirrorDocument: ProseMirrorDocument) {
        this.proseMirrorDocument = proseMirrorDocument
    }

    public get json(): string { return this.getJsonValue() }
    public get text(): string { return this.getTextValue() }
    public get html(): string { throw Error('Not Implemented') }

    private getJsonValue(): string {
        return this.proseMirrorDocument.getStringifiedJsonValue()
    }

    private getTextValue(): string {
        return this.proseMirrorDocument.extractPureText()
    }
}
