import { Router } from 'express'
import { check } from 'express-validator'
import {
  createNewUser,
  getAllUsers,
  userLogin
} from '../controllers/user.controller.js'

const router = Router()

router.get('/', getAllUsers)
router.post(
  '/create',
  [
    check('firstName', 'name is required').not().isEmpty(),
    check('lastName', 'name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check(
      'password',
      'password must contain a minimum of 6 characters'
    ).isLength({ min: 6 })
  ],
  createNewUser
)

router.post(
  '/',
  [
    check('email', 'Email is required').isEmail(),
    check(
      'password',
      'password must contain a minimum of 6 characters'
    ).isLength({ min: 6 })
  ],
  userLogin
)

export default router
