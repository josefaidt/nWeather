const { GraphQLServer } = require('graphql-yoga')
const {
  owm: { currentWeather, forecast },
} = require('./resolvers')
const typeDefs = require('./typeDefs')

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
const server = new GraphQLServer({ typeDefs: typeDefs, logger, resolvers })
const options = {
  port: 80,
  endpoint: '/api',
  playground: '/',
  // defaultPlaygroundQuery: defaultQuery,
}
if (process.env.NODE_ENV === 'production') {
  options.defaultPlaygroundQuery = defaultQuery
}
server.start(options, ({ port, endpoint, playground }) => {
  console.info(`Server is running on http://localhost:${port}`)
  console.info(`API is listening on http://localhost:${port}${endpoint}`)
  console.info(`Playground is listening on http://localhost:${port}${playground}`)
})
