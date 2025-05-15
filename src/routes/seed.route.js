import { Router } from 'express'
import bcrypt from 'bcrypt'
import { usersData } from '../seed-data/users.js'
import User from '../models/User.js'

const router = Router()

router.get('/users', async (_, res) => {
  try {
    const usersToInsert = await Promise.all(
      usersData.map(async user => {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password, salt)
        return { ...user, password: hashedPassword }
      })
    )

    await User.insertMany(usersToInsert)

    res.status(201).send({ message: 'Users seeded successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'Error seeding users' })
  }
})

router.get('/appointments', (_, res) => {
  res.send({
    message: 'Seed executed successfully'
  })
})

export default router
