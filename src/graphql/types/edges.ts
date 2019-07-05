
import * as _ from 'lodash'
import * as moment from 'moment'
import { Request } from 'express'
import {
    GraphQLBoolean,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'

export const edges = (model: GraphQLObjectType) =>
    new GraphQLObjectType({
        name: `Edges_${model.name}`,
        fields: {
            edges: {
                type: new GraphQLList(model),
            },
            edgesTotal: {
                type: GraphQLInt,
            },
            pagination: {
                type: new GraphQLObjectType({
                    name: 'Edges_Pagination',
                    fields: {
                        cursor: {
                            type: GraphQLString,
                        },
                        nextCursor: {
                            type: GraphQLString,
                        },
                        previousCursor: {
                            type: GraphQLString,
                        },
                    },
                }),
            },
        },
    })
