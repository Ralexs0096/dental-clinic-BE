import { Router } from 'express'
import { createNewUser, getAllUsers } from '../controllers/user.controller.js'

const router = Router()

router.get('/', getAllUsers)
router.post('/', createNewUser)

export default router
