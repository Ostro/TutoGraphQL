const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require('graphql');

module.exports = new GraphQLObjectType({
    name:   'personType',
    fields: {
        firstName: {type: GraphQLString},
        lastName:  {type: GraphQLString},
        age:       {type: GraphQLInt}
    }
});