import { signinHandler } from '@/handlers/auth/signin.handler'
import { signupHandler } from '@/handlers/auth/signup.handler'
import {
  SignInBody,
  signInSchemaBody,
  SignUpBody,
  signUpSchemaBody
} from '@/schemas/auth/request'
import type { FastifyPluginAsync } from 'fastify'

export type PostSignUpRoute = {
  Body: SignUpBody
}

export type PostSignInRoute = {
  Body: SignInBody
}

const postAuthRoutes: FastifyPluginAsync = async fastify => {
  fastify.post<PostSignInRoute>(
    '/signin',
    {
      schema: {
        body: signInSchemaBody
      }
    },
    signinHandler
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
