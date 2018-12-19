
import { Schema, SchemaTypes } from 'mongoose'

export const AccessName = 'Access'

const accessSchema = new Schema({
    isActive:              { type: SchemaTypes.Boolean, default: false },
    username:              { type: SchemaTypes.String, default: null },
    password:              { type: SchemaTypes.String, default: null },
    isConnectedToGoogle:   { type: SchemaTypes.Boolean, default: false },
    isConnectedToFacebook: { type: SchemaTypes.Boolean, default: false },
    googleId:              { type: SchemaTypes.String, default: null },
    facebookId:            { type: SchemaTypes.String, default: null },
})

export { accessSchema }
