const {
    GraphQLSchema,
    GraphQLObjectType
} = require('graphql');

const personType = require('../graphql/personType');

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            me: {
                type:    personType,
                resolve: () => require('../data/me')
            }
        }
    })
});
