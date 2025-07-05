import fastify, { FastifyInstance } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'

// Global config for the three main instance of fastify
const config = {
  serverOptions: {
    logger: true
  },
  pluginOptions: {},
  applicationOptions: {}
}

const createServer = () => {
  const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
    fastify(config.serverOptions)

  server.setNotFoundHandler(function custom404(_, reply) {
    reply.send({
      message: 'URL Not Found.'
    })
  })

  process.on('SIGINT', async function closeApplication() {
    /**
     * Adding this signaling handle will prevent the kill of the server,
     * thus allowing the complete execution of the requests and preventing
     * new HTTP requests from being accepted.
     */
    const twoSeconds = 2_000
    const timeout = setTimeout(function forceClose() {
      server.log.error('force closing server')
      process.exit(1)
    }, twoSeconds)
    timeout.unref()

    try {
      await server.close()
      server.log.info('Bye Bye')
    } catch (error) {
      server.log.error(error, 'The app had trouble turning off')
    }
  })

  return server
}

export default createServer
