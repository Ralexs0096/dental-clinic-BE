import { isValid } from 'date-fns'

const isDate = value => {
  if (!value) return false

  return isValid(value) ? true : false
}

export default isDate
