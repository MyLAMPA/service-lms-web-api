
import { Schema, SchemaTypes } from 'mongoose'

import { AccessName } from './access'

export const UserName = 'User'

const userSchema = new Schema({
    access:    { type: SchemaTypes.ObjectId, ref: AccessName, default: null },
    email:     { type: SchemaTypes.String, required: true },
    firstName: { type: SchemaTypes.String, default: null },
    lastName:  { type: SchemaTypes.String, default: null },
})

export { userSchema }
