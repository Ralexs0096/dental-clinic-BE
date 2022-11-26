import { isValid } from 'date-fns'

const isDate = value => {
  if (!value) return false

  return isValid(new Date(value))
}

export default isDate
