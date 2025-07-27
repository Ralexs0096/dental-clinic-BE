import { RouteHandler } from 'fastify'
import { PostSignInRoute } from '@/routes/auth/routes.post'
import { PrismaClient } from '@prisma'
import { compare } from 'bcrypt-ts'

const messageError = 'Email or Password is incorrect'

export const signinHandler: RouteHandler<PostSignInRoute> = async (
  req,
  reply
) => {
  try {
    const prisma = new PrismaClient()
    const { email, password } = req.body

    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!existingUser?.id) {
      return reply.code(401).send({
        ok: false,
        message: messageError
      })
    }

    const isPasswordCorrect = await compare(password, existingUser.password)

    if (!isPasswordCorrect) {
      return reply.code(401).send({
        ok: false,
        message: messageError
      })
    }

    const token = req.server.generateToken(existingUser.id)

    reply.code(202).send({
      ok: true,
      token,
      user: {
        id: existingUser.id,
        email: existingUser.email,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        role: existingUser.role
      }
    })
  } catch (error) {
    console.error(error)

    reply.code(500).send({ ok: false, message: 'Internal server error.' })
  }
}
