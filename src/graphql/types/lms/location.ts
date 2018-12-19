
import { Request } from 'express'
import {
    GraphQLBoolean,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import { Model as LocationEquipmentModel } from './locationEquipment'
import * as locationEquipmentsServices from '../../../services/lms/locationEquipments'

export const Model = new GraphQLObjectType({
    name: 'Location',
    fields: {
        id: {
            type: GraphQLString,
            resolve(course) {
                if (course._id) {
                    return String(course._id)
                }
                return null
            },
        },
        name: {
            type: GraphQLString,
        },
        abbr: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        capacity: {
            type: GraphQLInt,
        },
        color: {
            type: GraphQLString,
        },
        equipment: {
            type: new GraphQLList(LocationEquipmentModel),
            async resolve(location, {}, { state }: Request) {
                const locationEquipments = []
                if (_.isArray(location.equipment)) {
                    for (let i = 0; i < location.equipment.length; i += 1) {
                        const item = location.equipment[i]
                        if (typeof item === 'string' || _.get(item, '_bsontype') === 'ObjectID') {
                            locationEquipments.push(await locationEquipmentsServices.getLocationEquipmentById(item, state))
                            continue
                        }
                        if (item) {
                            locationEquipments.push(item)
                            continue
                        }
                    }
                }
                return locationEquipments
            },
        },
    },
})
