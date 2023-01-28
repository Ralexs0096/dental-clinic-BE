import { createTransport } from 'nodemailer'
import path from 'path'
import hbs from 'nodemailer-express-handlebars'

const { SERVICE, EMAIL_USERNAME, EMAIL_PASSWORD } = process.env

const transporter = createTransport({
  port: 1025,
  service: SERVICE,
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD
  }
})

const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve('src/email/templates/'),
    defaultLayout: false
  },
  viewPath: path.resolve('src/email/templates/')
}

transporter.use('compile', hbs(handlebarOptions))

export default transporter
