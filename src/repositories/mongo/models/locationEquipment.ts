
import { Model } from 'mongoose'

import { mongoose } from '../connector'
import { locationEquipmentSchema } from '../schemas/locationEquipment'
import {
    LocationEquipmentDocument,
} from '../../../models'

const locationEquipmentModel: Model<LocationEquipmentDocument> = mongoose.model<LocationEquipmentDocument>('LocationEquipment', locationEquipmentSchema)

export { locationEquipmentModel }
