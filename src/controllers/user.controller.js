import User from '../models/User.js'
import bcrypt from 'bcrypt'

export const createNewUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const userExist = await User.findOne({ email })
    if (userExist) {
      return res.status(400).json({
        ok: false,
        message: 'This email is already used'
      })
    }

    const newUser = new User(req.body)
    const salt = bcrypt.genSalt()
    newUser.password = bcrypt.hashSync(password, parseInt(salt))
    const userCreated = await newUser.save()

    res.status(201).json({
      ok: true,
      userCreated
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Something was wrong'
    })
  }
}

export const getAllUsers = (_, res) => {
  try {
    const allUsers = User.findAll()

    if (allUsers.length > 0) {
      res.status(200).send({
        ok: true,
        allUsers
      })
    }

    res.status(204).send({
      ok: true,
      message: 'No existing users'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Something was wrong'
    })
  }
}

export const userLogin = (req, res) => {
  // login here
}
