import { Router } from 'express'
import { check } from 'express-validator'
import fieldValidator from '../middlewares/field-validator.js'
import { signUp, signIn, isAuth } from '../controllers/auth.controller.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const router = Router()

router.post(
  '/signin',
  [
    check('email', 'Email is required').isEmail(),
    check(
      'password',
      'password must contain a minimum of 6 characters'
    ).isLength({ min: 6 })
  ],
  fieldValidator,
  signIn,
)

router.post(
  '/signup',
  [
    check('email', 'Email is required').isEmail(),
    check(
      'password',
      'password must contain a minimum of 6 characters'
    ).isLength({ min: 6 })
  ],
  fieldValidator,
  signUp,
)

router.get(
  '/me',
  verifyToken,
  [
    check('email', 'Email is required').isEmail(),
    check(
      'password',
      'password must contain a minimum of 6 characters'
    ).isLength({ min: 6 })
  ],
  fieldValidator,
  isAuth,
)

export default router
