import { dirname, join } from 'path'
import AutoLoad from '@fastify/autoload'
import CreateServer from './server'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const server = CreateServer()

server.register(AutoLoad, {
  dir: join(__dirname, 'routes'),
  options: {}
})

server.listen({ port: 8080 }, err => {
  if (err) {
    console.log('Something went wrong', err)
  }

  console.log('Server is running on port 8080')
})
