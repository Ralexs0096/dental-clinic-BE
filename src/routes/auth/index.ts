import { FastifyPluginAsync } from 'fastify'
import postAuthRoutes from './routes.post'

const authRoutes: FastifyPluginAsync = async (fastify, opts) => {
  await postAuthRoutes(fastify, opts)
}

export default authRoutes
