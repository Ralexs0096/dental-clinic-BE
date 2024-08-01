import { Router } from 'express'
import {
  createNewAppointment,
  deleteAppointment,
  getAllAppointments,
  updateAppointment
} from '../controllers/appointment.controller.js'
import { check } from 'express-validator'
import isDate from '../helpers/isDate.js'
import fieldValidator from '../middlewares/field-validator.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const router = Router()

/**
 * @swagger
 * user:
 *   name: Appointments
 *   description: Appointments endpoints
 */

/**
 * @swagger
 * /appointment:
 *  get:
 *     summary: Get all appointments
 *     description: return all the appointments created (need permissions)
 *     responses:
 *        200:
 *          description: Returns all the appointments created
 *     tags: [Appointments]
 */
router.get('/', verifyToken, getAllAppointments)

/**
 * @swagger
 * /appointment:
 *  post:
 *    summary: Create a new appointment
 *    tags: [Appointments]
 *    parameters:
 *       - in: body
 *         name: signup
 *         description: The user to create.
 *         schema:
 *           type: object
 *           required:
 *             - title
 *             - user
 *             - startTime
 *             - endTime
 *           properties:
 *             title:
 *                type: string
 *             user:
 *                type: string
 *             startTime:
 *                type: string
 *             endTime:
 *                type: string
 */
router.post(
  '/',
  [
    check('title', 'title is required').not().isEmpty(),
    check('user', 'user is required').not().isEmpty(),
    check('startTime', 'start time is required').custom(isDate),
    check('endTime', 'end time is required').custom(isDate)
  ],
  fieldValidator,
  verifyToken,
  createNewAppointment
)

/**
 * @swagger
 * /appointment/:id:
 *  put:
 *    summary: allows to update an existing user by ID
 *    tags: [Appointments]
 *    parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         type: string
 */
router.put('/:id', verifyToken, updateAppointment)

/**
 * @swagger
 * /appointment/:id:
 *  delete:
 *    summary: allows to delete an existing user by ID
 *    tags: [Appointments]
 *    parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         type: string
 */
router.delete('/:id', verifyToken, deleteAppointment)

export default router
