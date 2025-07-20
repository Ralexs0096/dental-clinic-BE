import { RouteHandler } from 'fastify'
import { PrismaClient } from '@prisma'
import type { GetUsersRoute } from '@/routes/users/routes.get'

export const listUsersHandler: RouteHandler<GetUsersRoute> = async (
  _,
  reply
) => {
  try {
    const prisma = new PrismaClient()

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
