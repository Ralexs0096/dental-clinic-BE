import { Router } from 'express'
import { check } from 'express-validator'
import fieldValidator from '../middlewares/field-validator.js'
import { signUp, signIn, isAuth } from '../controllers/auth.controller.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const router = Router()

/**
 * @swagger
 * user:
 *   name: Auth
 *   description: Auth endpoints
 */

/**
 * @swagger
 * /auth/signin:
 *  post:
 *    summary: allows a user to log in
 *    tags: [Auth]
 *    parameters:
 *       - in: body
 *         name: signup
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 */
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
  signIn
)

/**
 * @swagger
 * /auth/signup:
 *  post:
 *    summary: allows a user to create an account
 *    tags: [Auth]
 *    responses:
 *       200:
 *         description: Returns the user ID and the token generated
 *    parameters:
 *       - in: body
 *         name: signup
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 */
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
  signUp
)

/**
 * @swagger
 * /me:
 *  get:
 *     summary: allows to validate the token provided to the endpoint
 *     description:
 *     responses:
 *        200:
 *          description: Returns all the users created
 *     tags: [Auth]
 *     parameters:
 *       - in: body
 *         name: signup
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 */
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
  isAuth
)

export default router
