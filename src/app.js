// const { GraphQLServer } = require('graphql-yoga')
const { ApolloServer } = require('apollo-server')
const {
  owm: { currentWeather, forecast },
} = require('./resolvers')
const typeDefs = require('./typeDefs')
const endpoint = process.env.NODE_ENV
  ? 'https://nweather.josefaidt.now.sh/api'
  : `http://localhost:${4000}`

const resolvers = {
  Query: {
    currentWeather,
    forecast,
  },
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  // playground: true,
  playground: {
    settings: {
      'editor.theme': 'dark',
    },
    tabs: [
      {
        endpoint: endpoint,
        query: defaultQuery,
      },
    ],
  },
})
server.listen({ port: process.env.PORT || 4000, endpoint: '/api' }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
