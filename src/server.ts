import fastify, { FastifyInstance } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import { dirname, join } from 'path'
import AutoLoad from '@fastify/autoload'
import Cors from '@fastify/cors'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  serializerCompiler,
  validatorCompiler
} from 'fastify-type-provider-zod'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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
    fastify(config.serverOptions).withTypeProvider<ZodTypeProvider>()

  server.setValidatorCompiler(validatorCompiler)
  server.setSerializerCompiler(serializerCompiler)

  server.register(Cors, {
    origin: true
  })

  server.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: {}
  })

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
