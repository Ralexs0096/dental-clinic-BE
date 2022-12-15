import jwt from 'jsonwebtoken'

export async function verifyToken (req, res, next) {
  const token = req.headers['x-access-token']
  if (!token) {
    return res.status(401).json({
      auth: false,
      message: 'No token was provided'
    })
  }
  const decoded = jwt.verify(token, process.env.SECRET)
  req.userId = decoded.id
  next()
}

