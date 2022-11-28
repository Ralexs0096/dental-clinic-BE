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

const router = Router()

router.get('/', getAllAppointments)
router.post(
  '/',
  [
    check('title', 'title is required').not().isEmpty(),
    check('user', 'user is required').not().isEmpty(),
    check('startTime', 'start time is required').custom(isDate),
    check('endTime', 'end time is required').custom(isDate)
  ],
  fieldValidator,
  createNewAppointment
)
router.put('/:id', updateAppointment)
router.delete('/:id', deleteAppointment)

export default router
