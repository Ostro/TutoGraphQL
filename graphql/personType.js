const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = require('graphql');

module.exports = new GraphQLObjectType({
    name:   'personType',
    description: 'a person object schema',
    fields: {
        id:        {
            description: 'a person id',
            type: GraphQLInt
        },
        firstName: {
            description: 'a person firstName',
            type: GraphQLString
        },
        lastName:  {
            description: 'a person firstName',
            type: GraphQLString
        },
        age:       {
            description: 'a person firstName',
            type: GraphQLInt
        },
        hobbies:   {
            description: 'a person hobbies',
            type: new GraphQLList(GraphQLString)
        }
    }
});