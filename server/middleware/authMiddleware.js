import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization']

  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.json({ message: 'Unauthorized' })
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    req.user = user

    next()
  })
}
