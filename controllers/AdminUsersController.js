const authConfig = require('../config/auth')
const {
  User
} = require('../models/index')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const {
  Op
} = require('sequelize')
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
  data.authorizationLevel = req.body.authorizationLevel
  if (data.authorizationLevel < 1 || data.authorizationLevel > 5) {
    return res.send({
      msg: 'Only users with 1 to 3 allowed'
    })
  }
  if (/^([a-zA-Z0-9@*#.,]{8,15})$/.test(data.password) !== true) {
    return res.send({
      msg: 'invalid password'
    })
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
              if (repeatedData == null) {
                User.create({
                  name: data.name,
                  email: data.email,
                  password: data.password,
                  authorizationLevel: data.authorizationLevel
                }).then(User => {
                  res.send({
                    msg: 'Welcome'
                  })
                }).catch(() => {
                  res.send({
                    msg: 'DB error'
                  })
                })
              } else {
                res.send({
                  msg: 'this user already exists'
                })
              }
            })
            .catch(() => {
              res.send({
                msg: 'DB error'
              })
            })
        } else {
          res.send('No deberías de estar aquí')
          // nodemailer
        }
      }).catch(() => {
        res.send({
          msg: 'DB error'
        })
      })
  } catch (error) {
    res.send({
      msg: 'DB error'
    })
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
  data.authorizationLevel = req.body.authorizationLevel
  if (data.authorizationLevel < 1 || data.authorizationLevel > 5) {
    return res.send({
      msg: 'you only can update 1 to 3 level user'
    })
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
          User.update(data, {
            where: {
              email: data.email
            }
          })
            .then(updated => {
              res.send({
                msg: 'updated'
              })
            })
            .catch(() => {
              res.send({
                msg: 'DB error'
              })
            })
        } else {
          res.send('No deberías de estar aquí')
          // nodemailer
        }
      }).catch(() => {
        res.send({
          msg: 'this user doesnt exists'
        })
      })
  } catch (error) {
    res.send({
      msg: 'DB error'
    })
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
              if (data.authorizationLevel >= 1 && data.authorizationLevel <= 5) {
                User.destroy({
                  where: {
                    email
                  },
                  truncate: false
                })
                  .then(() => {
                    res.send({
                      msg: 'deleted'
                    })
                  })
                  .catch(() => {
                    res.send({
                      msg: 'DB error'
                    })
                  })
              } else {
                res.send({
                  msg: 'you only can delete 1 to 3 level user'
                })
              }
            }).catch(() => {
              res.send({
                msg: 'User does not exists'
              })
            })
        } else {
          res.send('No deberías de estar aquí')
          // nodemailer
        }
      }).catch(() => {
        res.send({
          msg: 'DB error'
        })
      })
  } catch (error) {
    res.send({
      msg: 'DB error'
    })
  };
}

module.exports = AdminUsersController
