import { env } from '@/config/env'
import fastifyJwt from '@fastify/jwt'
import fp from 'fastify-plugin'

export default fp(async fastify => {
  fastify.register(fastifyJwt, {
    secret: env.SECRET || 'superSecretNeverReveal',
    verify: {
      extractToken: request => {
        const token = request.headers['x-access-token']

        if (token) {
          return token as string
        }
      }
    }
  })
})
