import Appointment from '../models/Appointment.js'

export const getAllAppointments = async (_, res) => {
  const appointments = await Appointment.find().populate('user', 'name')

  if (appointments.length > 0) {
    res.status(200).json({
      ok: true,
      appointments
    })
    return
  }

  res.status(200).json({
    ok: true,
    message: 'Currently, there are no appointments'
  })
}

export const createNewAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body)

    // TODO: add the logged In user ID (createdBy)

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
    const appoitment = await Appointment.findById(req.params.id)

    if (!appoitment) {
      return res.status(404).json({
        ok: false,
        msg: `appointment with ID ${req.params.id} does not exist`
      })
    }

    // TODO: VALIDATE IF THE USER HAS PERMISSIONS TO DELETE

    const appoitmentDeleted = await Appointment.findByIdAndDelete(req.params.id)

    res.status(200).json({
      ok: true,
      deleted: appoitmentDeleted
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Algo ha salido mal'
    })
  }
}
