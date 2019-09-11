
import { Schema } from '../../../../components/dynamoose'

const emailAddressSchema = new Schema({
    id: {
        type: String,
        hashKey: true,
        index: {
            global: true,
        },
    },
    email: {
        type: String,
        index: {
            global: true,
        },
    },
    //isVerified: {
    //    type: Boolean,
    //},
    //userId: {
    //    type: Number,
    //},
})

export { emailAddressSchema }
