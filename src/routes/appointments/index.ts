import { FastifyPluginAsync } from 'fastify'
import getAppointmentRoute from './routes.get'
import postAppointmentRoutes from './routes.post'

const usersRoutes: FastifyPluginAsync = async (fastify, opts) => {
  await Promise.all([
    getAppointmentRoute(fastify, opts),
    postAppointmentRoutes(fastify, opts)
  ])
}

export default usersRoutes
