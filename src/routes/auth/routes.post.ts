import { signupHandler } from '@/handlers/auth/signup.handler'
import { SignUpBody, signUpSchemaBody } from '@/schemas/auth/request'
import type { FastifyPluginAsync } from 'fastify'
import z from 'zod'

export type PostSignUpRoute = {
  Body: SignUpBody
}

const postAuthRoutes: FastifyPluginAsync = async fastify => {
  fastify.post(
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
  )

  fastify.post<PostSignUpRoute>(
    '/signup',
    {
      schema: {
        body: signUpSchemaBody
      }
    },
    signupHandler
  )
}

export default postAuthRoutes
