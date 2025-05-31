import User from '../models/User.js'
import { generateToken } from '../helpers/generateToken.js'

import Transporter from '../email/transport.js'

export const signUp = async (req, res) => {

  const userExist = await User.findOne({ email: req.body.email })
  if (userExist) {
    return res.status(400).json({
      ok: false,
      message: 'This email is already used'
    })
  }

  const user = new User(req.body)

  user.password = await user.encryptPassword(user.password)

  const createdUser = await user.save()
  const userToSend = createdUser.toObject()
  delete userToSend.password

  const token = generateToken(createdUser._id, createdUser.email) // provide the userId to sign the token

  res.json({ auth: true, token, userID: createdUser._id, user: userToSend })
}

export const signIn = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return res
      .status(404)
      .json({ ok: false, message: "The email provided does not match with any user" })
  }

  const isValidPassword = await user.validatePassword(password)

  if (!isValidPassword) {
    return res.status(401).json({ auth: false, token: null })
  }

  const token = generateToken(user._id, user.email) // provide the userId to sign the token
  const userToSend = user.toObject()
  delete userToSend.password

  res.status(200).json({ auth: true, token, user: userToSend })
}

export const isAuth = async (req, res) => {
  const user = await User.findById(req.userId)

  if (!user) {
    return res
      .status(404)
      .json({ ok: false, message: 'The user was not found' })
  }
  res.status(200).json({ auth: true, message: 'User is authenticated' })
}

export const forgotPassword = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    res.status(401).json({
      ok: false,
      message: 'User not Found'
    })
  }

  const newToken = generateToken(user._id, user.email)

  User.findByIdAndUpdate(
    { _id: user._id },
    {
      reset_password_token: newToken,
      reset_password_expires: Date.now() + 86400000
    },
    {
      new: true
    }
  )

  const emailOptions = {
    to: user.email,
    from: process.env.EMAIL_USERNAME,
    template: 'forgot-password-email',
    subject: 'Password help has arrived!',
    context: {
      // TODO: replace this url with the correct one
      url: 'http://localhost:3000/auth/resetPassword?token=' + newToken,
      name: user.name
    }
  }

  Transporter.sendMail(emailOptions, function (err) {
    if (!err) {
      return res.status(200).json({
        message: 'Kindly check your email for further instructions'
      })
    } else {
      return res.status(422).json({ message: err })
    }
  })
}
