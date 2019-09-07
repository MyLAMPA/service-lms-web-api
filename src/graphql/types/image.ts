
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

import { Model as TagModel } from './tag'

export const Model = new GraphQLObjectType({
    name: 'Image',
    fields: {
        id: {
            type: GraphQLString,
            resolve: image => _.isNil(image._id) ? null : String(image._id),
        },
        createdAt: {
            type: GraphQLString,
        },
        createdBy: {
            type: GraphQLInt,
        },
        file: {
            type: new GraphQLObjectType({
                name: 'Image_File',
                fields: {
                    key: {
                        type: GraphQLString,
                    },
                    fileKey: {
                        type: GraphQLString,
                    },
                },
            }),
        },
        title: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        tags: {
            type: new GraphQLList(TagModel),
        },
    },
})
