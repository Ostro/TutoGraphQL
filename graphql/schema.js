const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLInt,
    GraphQLString
} = require('graphql');
const fetch       = require('node-fetch');
const _           = require('lodash');
const personType  = require('../graphql/personType');
const weatherType = require('../graphql/weatherType');


const personsData = require('../data/persons.json');

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'demoQuery',
        description: 'available queries for this schema',
        fields: {
            aboutMe: {
                type:    personType,
                description: 'Some info about me',
                resolve: () => require('../data/me')
            },
            people: {
                type:    new GraphQLList(personType),
                description: 'showing list of persons, can be filter by id',
                args: {
                    id: {
                        description: 'a person id, it should be an int',
                        type: GraphQLInt
                    }
                },
                resolve: (root, args) => {
                    if (args.id) {
                        return [_.find(personsData.persons, {id: args.id})];
                    }
                    return personsData.persons
                }
            },
            weather: {
                type: weatherType,
                args: {
                    city: {type: GraphQLString}
                },
                resolve: (root, args) => {
                    return fetch(`http://api.apixu.com/v1/forecast.json?key=ff76e7046a864e7081f144016170905&q=${args.city}`)
                        .then(res => res.json())
                    ;
                }
            }
        }
    })
});
