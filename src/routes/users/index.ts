import { FastifyPluginAsync } from 'fastify'
import postUserRoute from './routes.post'
import getUserRoute from './routes.get'

const usersRoutes: FastifyPluginAsync = async (fastify, opts) => {
  await Promise.all([getUserRoute(fastify, opts), postUserRoute(fastify, opts)])
}

export default usersRoutes
