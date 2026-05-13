import type { FastifyPluginAsync } from 'fastify'
import { CreateUserBody, createUserSchema } from '@/schemas/users/request'
import { createUserHandler } from '@/handlers/users/createUser.handler'

export type PostUserRoute = {
  Body: CreateUserBody
}

const postUserRoutes: FastifyPluginAsync = async fastify => {
  fastify.post<PostUserRoute>(
    '/',
    {
      schema: {
        body: createUserSchema
      }
    },
    createUserHandler
  )
}

export default postUserRoutes
