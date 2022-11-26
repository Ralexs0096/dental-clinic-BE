import { Router } from 'express'
import { check } from 'express-validator'
import {
  createNewUser,
  getAllUsers,
  userLogin
} from '../controllers/user.controller.js'
import fieldValidator from '../middlewares/field-validator.js'

const router = Router()

router.get('/', getAllUsers)
router.post(
  '/create',
  [
    check('firstName', 'first name is required').not().isEmpty(),
    check('lastName', 'last name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check(
      'password',
      'password must contain a minimum of 6 characters'
    ).isLength({ min: 6 })
  ],
  fieldValidator,
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
  fieldValidator,
  userLogin
)

export default router
