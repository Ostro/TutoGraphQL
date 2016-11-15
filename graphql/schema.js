const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLInt
} = require('graphql');

const _           = require('lodash');
const personType  = require('../graphql/personType');
const WDPeople    = require('../data/WDPeople.json');

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            me: {
                type:    personType,
                resolve: () => require('../data/me')
            },
            persons: {
                type:    new GraphQLList(personType),
                resolve: () => WDPeople.persons
            },
            person: {
                type: personType,
                args: {
                    id: {type: GraphQLInt}
                },
                resolve: (root, args) => _.find(WDPeople.persons, {id: args.id})
            }
        }
    })
});
