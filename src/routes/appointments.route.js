import { Router } from 'express'
import {
  createNewAppointment,
  deleteAppointment,
  getAllAppointments,
  updateAppointment
} from '../controllers/appointment.controller.js'

const router = Router()

router.get('/', getAllAppointments)
router.post('/', createNewAppointment)
router.put('/:id', updateAppointment)
router.delete('/:id', deleteAppointment)

export default router
