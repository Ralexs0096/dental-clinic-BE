import { Router } from 'express'
import { check } from 'express-validator'
import fieldValidator from '../middlewares/field-validator.js'
import {
  signUp,
  signIn,
  isAuth,
  forgotPassword
} from '../controllers/auth.controller.js'
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
 *    responses:
 *      200:
 *        description: Returns the user ID and the token generated
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
    ).isLength({ min: 6 }),
    check('firstName', 'first name should not be empty').trim().notEmpty(),
    check('lastName', 'last name should not be empty').trim().notEmpty()
  ],
  fieldValidator,
  signUp
)

/**
 * @swagger
 * /auth/isAuth:
 *  get:
 *     summary: allows to validate the token provided to the endpoint
 *     description:
 *     responses:
 *        200:
 *          description: return a confirmation message
 *        400:
 *          description: token is invalid or has expired
 *     tags: [Auth]
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         type: string
 *         required: true
 */
router.get('/isAuth', verifyToken, isAuth)
/**
 * @swagger
 * /auth/forgotPassword:
 *  post:
 *    summary: allows the user to get a url to reset their password
 *    tags: [Auth]
 *    responses:
 *       200:
 *         description: Send a url to reset the password by email
 *    parameters:
 *       - in: body
 *         name: forgot password
 *         schema:
 *           type: object
 *           required:
 *             - email
 *           properties:
 *             email:
 *               type: string
 */
router.post(
  '/forgotPassword',
  [check('email', 'Email is required').isEmail()],
  fieldValidator,
  forgotPassword
)

// TODO: Add new endpoint to regenerate token

// TODO: Add new endpoint /me that should return the user information (receives a user ID)

export default router
