import express from 'express'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { options } from './swaggerOptions.js'
import dbConnection from './db/config.js'
import Routes from './routes/index.js'

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 4000
    this.specs = swaggerJSDoc(options)

    this.database()
    this.middleware()
    this.router()
    this.documentation()
  }

  database() {
    dbConnection()
  }

  middleware() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  documentation() {
    this.app.use('/doc', swaggerUI.serve, swaggerUI.setup(this.specs))
  }

  router() {
    this.app.use('/check', (_, res) => {
      res.json({
        alive: true
      })
    })

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
