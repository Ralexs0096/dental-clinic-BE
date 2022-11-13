import express from 'express'
import cors from 'cors'
import Routes from './routes/index.js'

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 4000

    // this.database()
    this.middleware()
    this.router()
  }

  // database() {}

  middleware() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  router() {
    Routes.forEach(({ path, route }) => {
      this.app.use(path, route)
    })
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on Port', this.port)
    })
  }
}

export default Server
