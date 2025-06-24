import User from '../models/User.js'

export const createNewUser = async (req, res) => {
  try {
    const { email } = req.body

    const userExist = await User.findOne({ email })
    if (userExist) {
      return res.status(400).json({
        ok: false,
        message: 'This email is already used'
      })
    }
    const newUser = new User(req.body)
    await newUser.encryptPassword(newUser.password)
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

export const getAllUsers = async (req, res) => {
  try {
    const requester = await User.findById(req.userId)

    if (requester.role === 'user') {
      res.send({
        ok: true,
        allUsers: []
      })
      return
    }

    const allUsers = await User.find()

    if (allUsers.length > 0) {
      res.status(200).send({
        ok: true,
        allUsers
      })
      return
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
