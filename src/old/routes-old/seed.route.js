import { Router } from 'express'
import bcrypt from 'bcrypt'
import { usersData } from '../seed-data/users.js'
import User from '../models/User.js'
import { appointmentsData } from '../seed-data/appointments.js'
import Appointment from '../models/Appointment.js'

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

router.get('/appointments', async (_, res) => {
  try {
    const users = await User.find()

    if (users.length < 2) {
      return res.status(400).send({
        message: 'At least two users are required to seed appointments'
      })
    }

    const appointmentsToInsert = appointmentsData.map(appointment => {
      const user = users[Math.floor(Math.random() * users.length)]
      let createdBy = users[Math.floor(Math.random() * users.length)]
      while (createdBy._id.equals(user._id)) {
        createdBy = users[Math.floor(Math.random() * users.length)]
      }

      return {
        ...appointment,
        user: user._id,
        createdBy: createdBy._id
      }
    })

    await Appointment.insertMany(appointmentsToInsert)

    res.status(201).send({ message: 'Appointments seeded successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'Error seeding appointments' })
  }
})

export default router
