import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.send({ msg: 'testing the endpoint' })
})

export default router
