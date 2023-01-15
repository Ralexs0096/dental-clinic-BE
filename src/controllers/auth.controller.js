import User from '../models/User.js'
import { generateToken } from '../helpers/generateToken.js'

export const signUp = async (req, res) => {
  const { username, email, password } = req.body

  const userExist = await User.findOne({ email })
  if (userExist) {
    return res.status(400).json({
      ok: false,
      message: 'This email is already used'
    })
  }

  const user = new User({
    username,
    email,
    password
  })

  user.password = await user.encryptPassword(user.password)

  const createdUser = await user.save()

  const token = generateToken(createdUser._id) // provide the userId to sign the token

  res.json({ auth: true, token, userID: createdUser._id })
}

export const signIn = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email: email })

  if (!user) {
    return res.status(404).send("The email provided doesn't exist.")
  }

  const isValidPassword = await user.validatePassword(password)

  if (!isValidPassword) {
    return res.status(401).json({ auth: false, token: null })
  }

  const token = generateToken()

  res.status(200).json({ auth: true, token })
}

export const isAuth = async (req, res) => {
  const user = await User.findById(req.userId, { password: 0 })

  if (!user) {
    return res.status(404).send('The user was not found')
  }
  res.json(user)
}
