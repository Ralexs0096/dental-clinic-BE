import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUserBody } from 'schemas/users/request'

export const createUserHandler = async (
  req: FastifyRequest<{ Body: CreateUserBody }>,
  reply: FastifyReply
) => {
  const user = req.body

  const savedUser = {
    id: Math.floor(Math.random() * 10000),
    name: user.firstName
  }

  reply.code(201).send(savedUser)
}
