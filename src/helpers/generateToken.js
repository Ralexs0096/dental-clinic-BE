import jwt from 'jsonwebtoken'

/**
 * generate a new token
 * @param {string} signature for the token
 * @returns a new token
 */

export const generateToken = signature => {
  return jwt.sign({ id: signature }, process.env.SECRET, {
    //tokens expiration is to be determined, set to last two hours in the meantime.
    expiresIn: 1000 * 60 * 60 * 2
  })
}
