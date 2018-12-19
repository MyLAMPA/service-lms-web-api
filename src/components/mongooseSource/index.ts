
import * as mongoose from 'mongoose'
import { Promise as BluebirdPromise } from 'bluebird'

export class MongooseSource {
    private readonly url: string
    private readonly connection: mongoose.Mongoose

    constructor(url: string) {
        this.url = url
        this.connection = new mongoose.Mongoose()
        this.connection.Promise = BluebirdPromise
    }

    connect() {
        this.connection.connect(this.url, { useMongoClient: true })
    }

    collection<Document extends { _id?: string }>(name: string, schema: mongoose.Schema, tableName: string): mongoose.Model<Document&mongoose.Document> {
        return this.connection.model<Document&mongoose.Document>(name, schema, tableName)
    }
}
