import type { FastifyPluginAsync } from 'fastify'
import { listUsersHandler } from '@/handlers/users/listUsers.handler'
import { GetUsersSchema, UserBody } from '@/schemas/users/response'

export type GetUsersRoute = {
  Reply: {
    ok: boolean
    users: UserBody[]
  }
}

const getUserRoutes: FastifyPluginAsync = async fastify => {
  fastify.get<GetUsersRoute>(
    '/',
    {
      schema: {
        response: {
          200: GetUsersSchema
        }
      }
    },
    listUsersHandler
  )
}

export default getUserRoutes
