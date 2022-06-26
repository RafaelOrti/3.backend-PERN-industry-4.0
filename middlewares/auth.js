const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

module.exports = (req, res, next) => {
  console.log(req.headers)

  // Check that the token exists
  if (!req.headers.authorization) {
    res.status(401).json({ msg: 'Acceso no autorizado' })
  } else {
    // Get the token
    const token = req.headers.authorization.split(' ')[1]

    // Check the validity of this token
    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) {
        res.status(500).json({ msg: 'Ha ocurrido un problema al decodificar el token', err })
      } else {
        req.user = decoded
        next()
      }
    })
  }
}
