const authConfig = require('../config/auth')
const { User } = require('../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const AdminUsersController = {}

// Admin PROFILE VIEW

// read users Admin
// http://localhost:5000/users
AdminUsersController.adminReadUsers = (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, authConfig.secret)
    User.findOne({
      where: {
        email: payload.user.email
      }
    })
      .then(found => {
        if (found.authorizationLevel === 5) {
          // controller function
          User.findAll({
            where: {
              authorizationLevel: {
                [Op.or]: [1, 2, 3, 4, 5]
              }
            }
          })
            .then(data => {
              res.send(data)
            }).catch(error => {
              res.send(error)
            })
        } else {
          res.send('No deberías de estar aquí')
          // nodemailer
        }
      }).catch(() => {
        res.send('No tiene autorización para leer esto')
      })
  } catch (error) {
    res.send(error)
  };
}

// create new user Admin
// http://localhost:5000/users
AdminUsersController.adminCreateUser = (req, res) => {
  // read data from request
  const data = {}
  data.name = req.body.name
  data.email = req.body.email
  data.password = req.body.password
  if (data.authorizationLevel < 1 && data.authorizationLevel > 5) {
    return res.send(
      'Sólo puedes crear Users de nivel 1 al 5'
    )
  }
  if (/^([a-zA-Z0-9@*#.,]{8,15})$/.test(data.password) !== true) {
    return res.send(
      'La contraseña debe tener al menos 8 caracteres y no más de 15 caracteres y utilizar simbolor alphanumericos y de puntuación.'
    )
  };
  data.password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds))
  // Admin authorization verification
  try {
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, authConfig.secret)
    User.findOne({
      where: {
        email: payload.user.email
      }
    })
      .then(found => {
        if (found.authorizationLevel === 5) {
          // controller function
          User.findOne({
            where: {
              email: data.email
            }
          })
            .then(repeatedData => {
              console.log(repeatedData)
              if (repeatedData == null) {
                User.create({
                  name: data.name,
                  email: data.email,
                  password: data.password,
                  authorizationLevel: data.authorizationLevel
                }).then(User => {
                  res.send(`Bienvenido, ${User.name}`)
                }).catch((error) => {
                  res.send(`Ha ocurrido el siguiente error ${error}`)
                })
              } else {
                res.send('El User con este e-mail ya existe en nuestra base de datos')
              }
            })
            .catch(error => {
              res.send(`Ha ocurrido el siguiente error: ${error}`)
            })
        } else {
          res.send('No deberías de estar aquí')
          // nodemailer
        }
      }).catch(error => {
        res.send(`Ha ocurrido el siguiente error: ${error}`)
      })
  } catch (error) {
    res.send(error)
  };
}

// update profile by email Admin
// http://localhost:5000/users/email/:email
AdminUsersController.adminUpdateUser = (req, res) => {
  // read data from request
  const data = {}
  data.name = req.body.name
  data.email = req.body.email
  data.password = req.body.password
  if (data.authorizationLevel < 1 && data.authorizationLevel > 5) {
    return res.send(
      'Sólo puedes actualizar Users de nivel 1 al 5'
    )
  }
  if (/^([a-zA-Z0-9@*#.,]{8,15})$/.test(data.password) !== true) {
    return res.send(
      'La contraseña debe tener al menos 8 caracteres y no más de 15 caracteres y utilizar simbolor alphanumericos y de puntuación.'
    )
  };
  data.password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds))
  // Admin authorization verification
  try {
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, authConfig.secret)
    console.log(payload.user.email)
    User.findOne({
      where: {
        email: payload.user.email
      }
    })
      .then(found => {
        if (found.authorizationLevel === 5) {
          // controller function
          User.update(data, {
            where: {
              email: data.email
            }
          })
            .then(updated => {
              res.send(updated)
            })
            .catch((error) => {
              res.send(`Ha ocurrido el siguiente error ${error}`)
            })
        } else {
          res.send('No deberías de estar aquí')
          // nodemailer
        }
      }).catch(error => {
        res.send(`No se ha encontrado tu usuario, error : ${error}`)
      })
  } catch (error) {
    res.send(error)
  };
}

// delete user by email Admin
// http://localhost:5000/users/:email
AdminUsersController.adminDeleteUser = (req, res) => {
  // read data from request
  const email = req.body.email
  try {
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, authConfig.secret)
    User.findOne({
      where: {
        email: payload.user.email
      }
    })
      .then(found => {
        if (found.authorizationLevel === 5) {
          // controller function
          User.findOne({
            where: {
              email
            }
          })
            .then(data => {
              if (data.authorizationLevel > 1 && data.authorizationLevel < 5) {
                User.destroy({
                  where: {
                    email
                  },
                  truncate: false
                })
                  .then(() => {
                    res.send(`El usuario con la email ${email} ha sido eliminado`)
                  })
                  .catch((error) => {
                    res.send(`Ha ocurrido el siguiente error ${error}`)
                  })
              } else {
                res.send('Sólo puedes eliminar un User de nivel 1 al 5')
              }
            }).catch(() => {
              res.send('Este usuario que quieres eliminar no existe')
            })
        } else {
          res.send('No deberías de estar aquí')
          // nodemailer
        }
      }).catch(() => {
        res.send('No deberías de estar aquí')
      })
  } catch (error) {
    res.send(error)
  };
}

module.exports = AdminUsersController
