import { FastifyReply, FastifyRequest } from 'fastify'

export const listUsersHandler = async (
  _: FastifyRequest,
  reply: FastifyReply
) => {
  reply.code(201).send([
    {
      id: 1,
      name: 'Steve Vai'
    }
  ])
}
