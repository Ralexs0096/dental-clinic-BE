import { validationResult } from 'express-validator'

const fieldValidator = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped()
    })
  }
  next()
}

export default fieldValidator
