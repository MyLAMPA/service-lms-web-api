
import { Schema, SchemaTypes } from 'mongoose'

export const AccessName = 'Access'

const accessSchema = new Schema({
    isActive:            { type: SchemaTypes.Boolean, default: true },
    username:            { type: SchemaTypes.String, default: null },
    password:            { type: SchemaTypes.String, default: null },
    isGoogleConnected:   { type: SchemaTypes.Boolean, default: false },
    isFacebookConnected: { type: SchemaTypes.Boolean, default: false },
    googleId:            { type: SchemaTypes.String, default: null },
    facebookId:          { type: SchemaTypes.String, default: null },
})

export { accessSchema }
