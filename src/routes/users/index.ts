import { FastifyPluginAsync } from 'fastify'

const usersRoutes: FastifyPluginAsync = async fastify => {
  fastify.get('/', async () => {
    return [
      {
        id: 1,
        name: 'Steve Vai'
      }
    ]
  })

  fastify.post('/', async (req, reply) => {
    const user = req.body

    reply.code(201).send(user)
  })
}

export default usersRoutes
