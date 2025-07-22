import type { FastifyPluginAsync } from 'fastify'
import z from 'zod'

const postAuthRoutes: FastifyPluginAsync = async fastify => {
  ;(fastify.post(
    '/signin',
    {
      schema: {
        response: {
          501: z.object({
            message: z.string()
          })
        }
      }
    },
    async (_, reply) => {
      return reply.code(501).send({ message: 'No implemented yet' })
    }
  ),
    fastify.post(
      '/signup',
      {
        schema: {
          response: {
            501: z.object({
              message: z.string()
            })
          }
        }
      },
      async (_, reply) => {
        return reply.code(501).send({ message: 'No implemented yet' })
      }
    ))
}

export default postAuthRoutes
