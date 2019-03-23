const { GraphQLServer } = require('graphql-yoga')
const { GraphQLObjectType, GraphQLInputObjectType, GraphQLFloat } = require('graphql') // CommonJS
const fetch = require('node-fetch')
const constructQueryUrl = require('./endpoints/openweathermap')

const coordsType = new GraphQLInputObjectType({
  name: 'CoordsType',
  fields: {
    lat: { type: GraphQLFloat },
    lon: { type: GraphQLFloat },
  },
})

const resolvers = {
  Query: {
    currentWeather: (_, { zip, city, coords }) => {
      if (zip && city) {
        throw new Error('Specify only one location argument')
      } else if (zip) {
        const url = constructQueryUrl('weather', { zip })
        return fetch(url)
          .then(res => res.json())
          .catch(console.error)
      } else if (city) {
        const url = constructQueryUrl('weather', { city })
        return fetch(url)
          .then(res => res.json())
          .catch(console.error)
      } else if (coords.lat && coords.lon) {
        const url = constructQueryUrl('weather', { coords })
        return fetch(url)
          .then(res => res.json())
          .catch(console.error)
      } else if (coords && (!coords.lat || !coords.lon)) {
        // TODO: properly handle coords filter, but no coord props
        throw new Error('Specify coordinates')
      } else {
        throw new Error('Specify at least one argument')
      }
    },
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
  defaultPlaygroundQuery: defaultQuery,
}
server.start(options, ({ port, endpoint, playground }) => {
  console.info(`Server is running on http://localhost:${port}`)
  console.info(`API is listening on http://localhost${endpoint}`)
  console.info(`Playground is listening on http://localhost${playground}`)
})
