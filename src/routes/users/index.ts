import { FastifyPluginAsync } from 'fastify'
import postUserRoutes from './routes.post'
import getUserRoutes from './routes.get'

const usersRoutes: FastifyPluginAsync = async (fastify, opts) => {
  await Promise.all([
    getUserRoutes(fastify, opts),
    postUserRoutes(fastify, opts)
  ])
}

export default usersRoutes
