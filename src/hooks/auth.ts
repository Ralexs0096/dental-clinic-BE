import '@fastify/jwt'
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import fp from 'fastify-plugin'

declare module 'fastify' {
  interface FastifyRequest {
    userId: string
  }
}

const authHook = async (fastify: FastifyInstance) => {
  fastify.addHook(
    'preHandler',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const publicPaths = ['/auth/login', '/auth/register']

      if (publicPaths.includes(request.originalUrl)) {
        return
      }

      try {
        await request.jwtVerify()

        fastify.log.info(`Authenticated user: ${request.userId}`)
      } catch (error) {
        fastify.log.warn('JWT verification failed', error)
        reply
          .code(401)
          .send({ error: 'Unauthorized', message: 'Invalid Token' })
      }
    }
  )
}

export default fp(authHook)
