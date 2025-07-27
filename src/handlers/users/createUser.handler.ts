import { USER_ROLES } from '@/config/constants'
import { PostUserRoute } from '@/routes/users/routes.post'
import { PrismaClient } from '@prisma'
import { hash } from 'bcrypt-ts'
import { RouteHandler } from 'fastify'

export const createUserHandler: RouteHandler<PostUserRoute> = async (
  req,
  reply
) => {
  try {
    const prisma = new PrismaClient()
    const newUserPayload = req.body

    const requesterUser = await prisma.user.findUniqueOrThrow({
      where: {
        id: req.userId
      }
    })

    if (requesterUser.role !== USER_ROLES.Admin) {
      return reply.code(401).send({
        ok: false,
        message: 'Your current role is not allowed to create new users.'
      })
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: newUserPayload.email
      }
    })

    if (existingUser?.id) {
      return reply.code(409).send({
        ok: false,
        message: 'The specified email is already in use.'
      })
    }

    const hashedPassword = await hash(newUserPayload.password, 10)

    const newUser = await prisma.user.create({
      data: {
        ...newUserPayload,
        role: newUserPayload.role ?? USER_ROLES.User,
        password: hashedPassword
      }
    })

    reply.code(201).send({
      ok: true,
      message: 'User created successfully',
      user: newUser
    })
  } catch (error) {
    console.error(error)

    reply.code(500).send({ ok: false, message: 'Internal server error.' })
  }
}
