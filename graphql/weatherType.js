const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = require('graphql');

const weatherForecast = new GraphQLObjectType({
    name: 'weatherForecastType',
    fields: {
        temperature: {
            type: GraphQLInt,
            resolve: forecast => forecast.temp_c
        },
        temp_f: {type: GraphQLInt},
        label: {
            type: GraphQLString,
            resolve: forecast => forecast.condition.text
        },
        iconUrl: {
            type: GraphQLString,
            resolve: forecast => forecast.condition.icon
        },
        date: {
            type: GraphQLString,
            resolve: forecast => {
                // last_updated is only available for today weather
                if (forecast.last_updated) {
                    return forecast.last_updated;
                }
                // otherwise we use the time timestamp
                else if (forecast.time) {
                    return forecast.time;
                }
            }
        }
    }
});

module.exports = new GraphQLObjectType({
    name:   'weatherType',
    fields: {
        location: {
            type: GraphQLString,
            resolve: weatherForecast => weatherForecast.location.name
        },
        region: {
            type: GraphQLString,
            resolve: weatherForecast => weatherForecast.location.region
        },
        country: {
            type: GraphQLString,
            resolve: weatherForecast => weatherForecast.location.country
        },
        today: {
            type: weatherForecast,
            resolve: weatherData => weatherData.current
        },
        tomorrow: {
            type: new GraphQLList(weatherForecast),
            resolve: weatherData => weatherData.forecast.forecastday[0].hour
        }
    }
});