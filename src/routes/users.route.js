import { Router } from 'express'
import { check } from 'express-validator'
import { createNewUser, getAllUsers } from '../controllers/user.controller.js'
import fieldValidator from '../middlewares/field-validator.js'

const router = Router()

/**
 * @swagger
 * user:
 *   name: Users
 *   description: User endpoints
 */

/**
 * @swagger
 * /user:
 *  get:
 *     summary: Get all available users
 *     description: returns all users stored in the database when the requester has have permissions to see the users
 *     responses:
 *        200:
 *          description: Returns all the users created
 *     tags: [Users]
 */
router.get('/', getAllUsers)

/**
 * @swagger
 * /user/create:
 *  post:
 *    summary: Create a new user
 *    tags: [Users]
 *    parameters:
 *       - in: body
 *         name: signup
 *         description: The user to create.
 *         schema:
 *           type: object
 *           required:
 *             - firstName
 *             - lastName
 *             - email
 *             - password
 *           properties:
 *             firstName:
 *                type: string
 *             lastName:
 *                type: string
 *             email:
 *                type: string
 *             password:
 *                type: string
 */
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

export default router
