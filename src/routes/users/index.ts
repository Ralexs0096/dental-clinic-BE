import { FastifyPluginAsync } from 'fastify'
import { createUserSchema, CreateUserInput } from 'schemas/users/request'
import z from 'zod'

const usersRoutes: FastifyPluginAsync = async fastify => {
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
    async () => {
      return [
        {
          id: 1,
          name: 'Steve Vai'
        }
      ]
    }
  )

  fastify.post<{
    Body: CreateUserInput
  }>(
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
    async (req, reply) => {
      const user = req.body

      reply.code(201).send(user)
    }
  )
}

export default usersRoutes
