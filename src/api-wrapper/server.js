const fs = require('fs')
const { ApolloServer, gql } = require('apollo-server')
const {
  owm: { currentWeather, forecast },
} = require('../resolvers')

const resolvers = {
  Query: {
    currentWeather,
    forecast,
  },
}

const typeDefs = gql(fs.readFileSync(__dirname.concat('/schema.graphql'), 'utf8'))

const config = {
  typeDefs,
  resolvers,
  introspection: true,
  // playground: true,
}

const defaultQuery = `query {
  currentWeather(zip: 70769) {
    name
    weather {
      main
      description
    }
    main {
      temp
    }
  }
}`

const server = new ApolloServer(config)

module.exports = {
  defaultQuery,
  instance: server,
}
