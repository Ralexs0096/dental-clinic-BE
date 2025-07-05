import type { FastifyPluginAsync } from 'fastify'
import z from 'zod'
import { listUsersHandler } from 'handlers/users/listUsers.handler'

const getUserRoute: FastifyPluginAsync = async fastify => {
  fastify.get(
    '/',
    {
      schema: {
        response: {
          201: z.object({
            id: z.number(),
            name: z.string()
          })
        }
      }
    },
    listUsersHandler
  )
}

export default getUserRoute
