import { Router } from 'express'
import { check } from 'express-validator'
import { login } from '../controllers/auth.controller.js'
import fieldValidator from '../middlewares/field-validator.js'

const router = Router()

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
  login
)

export default router
