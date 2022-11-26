import User from '../models/User.js'

export const createNewUser = async (req, res) => {
  console.log(req.body)
  try {
    const newUser = new User(req.body)
    const userCreated = await newUser.save()

    req.json({
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
