import CreateServer from './server'

const server = CreateServer()

server.listen({ port: 8080 }, err => {
  if (err) {
    console.log('Something went wrong', err)
  }

  console.log('Server is running on port 8080')
})
