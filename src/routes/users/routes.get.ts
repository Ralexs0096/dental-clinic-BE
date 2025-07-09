import type { FastifyPluginAsync } from 'fastify'
import { listUsersHandler } from 'handlers/users/listUsers.handler'
import { createdUserSchema } from 'schemas/users/response'

const getUserRoutes: FastifyPluginAsync = async fastify => {
  fastify.get(
    '/',
    {
      schema: {
        response: {
          201: createdUserSchema
        }
      }
    },
    listUsersHandler
  )
}

export default getUserRoutes
