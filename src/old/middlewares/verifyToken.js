import jwt from 'jsonwebtoken'

export async function verifyToken(req, res, next) {
  const token = req.headers['x-access-token']
  if (!token) {
    return res.status(401).json({
      auth: false,
      message: 'No token was provided'
    })
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      // more info:
      // https://github.com/auth0/node-jsonwebtoken#tokenexpirederror
      res.status(401).json({
        ok: false,
        ...err
      })
    } else {
      req.userId = decoded.uid
    }
  })

  next()
}
