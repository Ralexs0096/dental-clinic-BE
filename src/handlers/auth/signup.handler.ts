import { RouteHandler } from 'fastify'
import { PrismaClient } from '@prisma'
import { PostSignUpRoute } from '@/routes/auth/routes.post'
import { hash } from 'bcrypt-ts'

export const signupHandler: RouteHandler<PostSignUpRoute> = async (
  req,
  reply
) => {
  try {
    const { email, password, ...rest } = req.body
    const prisma = new PrismaClient()

    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (existingUser?.id) {
      return reply.code(409).send({
        ok: false,
        message: 'Email already exist'
      })
    }

    const hashedPassword = await hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        ...rest
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true
      }
    })

    const token = req.server.generateToken(newUser.id)

    reply.code(201).send({
      ok: true,
      user: newUser,
      token
    })
  } catch (error) {
    console.error(error)

    reply.code(500).send({ ok: false, message: 'Internal server error.' })
  }
}
