import type { FastifyPluginAsync } from 'fastify'
import { createUserSchema } from '@/schemas/users/request'
import { createUserHandler } from '@/handlers/users/createUser.handler'
import z from 'zod'

const postUserRoutes: FastifyPluginAsync = async fastify => {
  fastify.post(
    '/',
    {
      schema: {
        body: createUserSchema,
        response: {
          201: z.object({
            id: z.number(),
            name: z.string()
          })
        }
      }
    },
    createUserHandler
  )
}

export default postUserRoutes
