import { Router } from 'express'

const router = Router()

router.get('/users', (req, res) => {
  res.send({
    message: 'Seed executed successfully'
  })
})

router.get('/appointments', (req, res) => {
  res.send({
    message: 'Seed executed successfully'
  })
})

export default router
