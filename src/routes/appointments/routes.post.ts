import type { FastifyPluginAsync } from 'fastify'

const postAppointmentRoutes: FastifyPluginAsync = async fastify => {
  fastify.post(
    '/',
    {
      schema: {
        response: {
          200: {}
        }
      }
    },
    async (_, reply) => {
      reply.code(200).send({
        message: 'Not implemented yet'
      })
    }
  )
}

export default postAppointmentRoutes
