import type { FastifyPluginAsync } from 'fastify'
import z from 'zod'
import { listUsersHandler } from '@/handlers/users/listUsers.handler'
import { UserBody, userSchema } from '@/schemas/users/response'

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
          200: z.object({
            ok: z.literal(true),
            users: z.array(userSchema)
          })
        }
      }
    },
    listUsersHandler
  )
}

export default getUserRoutes
