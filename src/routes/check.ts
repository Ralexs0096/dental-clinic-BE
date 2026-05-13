import { FastifyPluginAsync } from 'fastify'

const checkRoute: FastifyPluginAsync = async fastify => {
  fastify.get('/check', async () => {
    return { isAlive: true }
  })
}

export default checkRoute
