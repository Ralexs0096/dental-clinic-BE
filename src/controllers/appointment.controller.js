import Appointment from '../models/Appointment.js'
import User from '../models/User.js'

export const getAllAppointments = async (req, res) => {
  const requester = await User.findById(req.userId)

  const isAdmin = requester.role === 'admin'
  const filter = isAdmin ? {} : { user: requester._id }

  const appointments = await Appointment.find(filter)
    .populate('createdBy', '-password -updated_at -created_at -__v')
    .lean()

  if (appointments.length === 0) {
    return res.status(204)
  }

  res.status(200).json({
    ok: true,
    appointments: appointments.map(
      ({ _id, user, title, startTime, endTime, createdBy, description }) => ({
        id: _id,
        title,
        description,
        startTime,
        endTime,
        createdBy,
        user
      })
    )
  })
}

export const createNewAppointment = async (req, res) => {
  try {
    const appointment = new Appointment({
      ...req.body,
      createdBy: req.userId
    })

    const appointmentCreated = await appointment.save()

    return res.status(201).json({
      ok: true,
      appointmentCreated
    })
  } catch (error) {
    console.log({ error })
    res.status(500).json({
      ok: false,
      message: 'Something went wrong!'
    })
  }
}

export const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)

    if (!appointment) {
      return res.status(404).json({
        ok: false,
        msg: `appointment with ID ${req.params.id} does not exist`
      })
    }

    // TODO: VALIDATE IF THE USER HAS PERMISSIONS TO EDIT

    const newAppointment = {
      ...req.body,
      user: req.uid
    }

    const appointmentUpdated = await Appointment.findByIdAndUpdate(
      req.params.id,
      newAppointment,
      { new: true }
    )

    res.json({
      ok: true,
      appointmentUpdated
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Algo ha salido mal'
    })
  }
}

export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)

    if (!appointment) {
      return res.status(404).json({
        ok: false,
        msg: `appointment with ID ${req.params.id} does not exist`
      })
    }

    // TODO: VALIDATE IF THE USER HAS PERMISSIONS TO DELETE

    const appointmentDeleted = await Appointment.findByIdAndDelete(
      req.params.id
    )

    res.status(200).json({
      ok: true,
      deleted: appointmentDeleted
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Algo ha salido mal'
    })
  }
}
