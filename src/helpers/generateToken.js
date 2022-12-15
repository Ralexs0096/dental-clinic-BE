
import jwt from 'jsonwebtoken'

export const generateToken = () => {
  return jwt.sign({ id: user._id }, process.env.SECRET, {
    //tokens expiration is to be determined, set to last two hours in the meantime.
    expiresIn: 1000 * 60 * 60 * 2
  })
}