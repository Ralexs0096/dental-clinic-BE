import { env } from 'config/env'
import CreateServer from './server'

const server = CreateServer()

server.listen({ port: env.PORT }, err => {
  if (err) {
    console.log('Something went wrong', err)
  }

  console.log(`Server is running on port ${env.PORT}`)
})
