const { GraphQLServer } = require('graphql-yoga')
const {
  owm: { currentWeather, forecast },
} = require('./resolvers')

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

const logger = { log: e => console.log(e) }
const server = new GraphQLServer({ typeDefs: './src/schema.graphql', logger, resolvers })
const options = {
  port: 8000,
  endpoint: '/api',
  playground: '/playground',
  // defaultPlaygroundQuery: defaultQuery,
}
server.start(options, ({ port, endpoint, playground }) => {
  console.info(`Server is running on http://localhost:${port}`)
  console.info(`API is listening on http://localhost:${port}${endpoint}`)
  console.info(`Playground is listening on http://localhost:${port}${playground}`)
})
