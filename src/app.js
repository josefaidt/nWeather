const config = require('./config')
const server1 = require('./api-wrapper')
const server2 = require('./api-polished')

const url = process.env.NODE_ENV
  ? config.endpoint.prod
  : `${config.endpoint.dev}:${config.apis.wrapper.port}`

const playground = {
  settings: {
    'editor.theme': 'dark',
  },
  tabs: [
    {
      endpoint: `${url}/api/v1`,
      query: server1.defaultQuery,
    },
    {
      endpoint: `${url}/api/v2`,
      query: server2.defaultQuery,
    },
  ],
}

server1.instance.playgroundOptions = { ...playground }

server1.instance
  .listen({ port: process.env.PORT || config.apis.wrapper.port, endpoint: '/api/v1' })
  .then(({ url }) => {
    console.log(`🎭  Playground ready at ${url}`)
    console.log(`🚀  API v1 ready at ${url}/api/v1`)
  })
server2.instance
  .listen({ port: process.env.PORT2 || config.apis.polished.port, endpoint: '/api/v2' })
  .then(({ url }) => {
    console.log(`🚀  API v2 ready at ${url}/api/v2`)
  })
