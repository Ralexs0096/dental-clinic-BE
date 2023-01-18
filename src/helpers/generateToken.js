import jwt from 'jsonwebtoken'

/**
 * generate a new token
 * @param {string} uid user ID
 * @param {string} name username
 * @returns a new token
 */

export const generateToken = (uid, name) => {
  const payload = { uid, name }
  return jwt.sign(payload, process.env.SECRET, {
    //tokens expiration is to be determined, set to last two hours in the meantime.
    expiresIn: '2h'
  })
}
