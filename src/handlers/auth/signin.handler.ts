import { RouteHandler } from 'fastify'
import { PostSignInRoute } from '@/routes/auth/routes.post'

export const signinHandler: RouteHandler<PostSignInRoute> = async (
  req,
  reply
) => {
  try {
    reply.code(200).send(req.body)
  } catch (error) {
    console.error(error)

    reply.code(500).send({ ok: false, message: 'Internal server error.' })
  }
}
