import { createTransport } from 'nodemailer'

const { SERVICE, EMAIL_USERNAME, EMAIL_PASSWORD } = process.env

export const sendEmail = ({
  toEmails,
  fromEmail = EMAIL_USERNAME,
  subjectText,
  descriptionText
}) => {
  const transporter = createTransport({
    port: 1025,
    service: SERVICE,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD
    }
  })

  const mailOptions = {
    from: fromEmail,
    to: toEmails,
    subject: subjectText,
    text: descriptionText
  }

  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      console.log('something was wrong')
    } else {
      console.log('Email sent')
    }
  })
}
