
import { Schema } from '../../../../components/dynamoose'

const emailAddressSchema = new Schema({
    id: {
        type: String,
        hashKey: true,
        index: {
            global: true,
        },
    },
    name: {
        type: String,
    },
})

export { emailAddressSchema }
