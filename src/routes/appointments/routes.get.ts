import type { FastifyPluginAsync } from 'fastify'

const getAppointmentRoutes: FastifyPluginAsync = async fastify => {
  fastify.get(
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

export default getAppointmentRoutes
