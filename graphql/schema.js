const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLInt
} = require('graphql');

const _           = require('lodash');
const personType  = require('../graphql/personType');
const personsData = require('../data/persons.json');

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
                resolve: () => personsData.persons
            },
            person: {
                type: personType,
                args: {
                    id: {type: GraphQLInt}
                },
                resolve: (root, args) => _.find(personsData.persons, {id: args.id})
            }
        }
    })
});
