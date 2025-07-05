import { FastifyPluginAsync } from 'fastify'

const appointmentsRoutes: FastifyPluginAsync = async fastify => {
  fastify.get('/', async () => {
    return [
      {
        id: 1,
        title: 'my first appointment'
      }
    ]
  })

  fastify.post('/', async (req, reply) => {
    const appointment = req.body

    reply.code(201).send(appointment)
  })
}

export default appointmentsRoutes
