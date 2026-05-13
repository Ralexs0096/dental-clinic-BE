import { RouteHandler } from 'fastify'
import { PrismaClient } from '@prisma'
import type { GetUsersRoute } from '@/routes/users/routes.get'
import { USER_ROLES } from '@/config/constants'

export const listUsersHandler: RouteHandler<GetUsersRoute> = async (
  req,
  reply
) => {
  try {
    const prisma = new PrismaClient()

    const requesterUser = await prisma.user.findUnique({
      where: {
        id: req.userId
      }
    })

    if (requesterUser?.role !== USER_ROLES.Admin) {
      return reply.code(401).send({
        ok: false,
        message: 'You are not allowed to perform this action.'
      })
    }

    const users = await prisma.user.findMany()
    const response = users.map(
      ({ id, firstName, lastName, email, address, phone, role }) => ({
        id,
        firstName,
        lastName,
        email,
        address,
        phone,
        role
      })
    )

    reply.code(200).send({
      ok: true,
      users: response
    })
  } catch (error) {
    console.error(error)

    reply.code(500).send({ ok: false, users: [] })
  }
}
