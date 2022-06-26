const authConfig = require('../config/auth')
const {
  User
} = require('../models/index')
// const { Op } = require('sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ProfileUsersController = {}

// USERS PROFILE VIEW

// read profile
// http://localhost:5000/users/profile
ProfileUsersController.readProfile = (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, authConfig.secret)
    User.findOne({
      where: {
        email: payload.user.email
      }
    })
      .then(found => {
        if (found) {
          res.send(`El usuario con el email ${payload.user.email} ha sido encontrado`)
        } else {
          res.send('No se ha encontrado tu usuario por favor consulta con servicio técnico')
        }
      }).catch(error => {
        res.send(error)
      })
  } catch (error) {
    res.send(error)
  };
}

// update profile
// http://localhost:5000/users/update
ProfileUsersController.updateProfile = (req, res) => {
  const data = {}
  data.name = req.body.name
  data.email = req.body.email
  data.password = req.body.password

  if (/^([a-zA-Z0-9@*#.,]{8,15})$/.test(req.body.password) !== true) {
    return res.send({
      msg: 'invalid password'
    })
  } else {
    data.password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds))
    try {
      const token = req.headers.authorization.split(' ')[1]
      const payload = jwt.verify(token, authConfig.secret)
      // console.log(payload.user.email);
      User.update(data, {
        where: {
          email: payload.user.email
        }
      })
        .then(() => {
          User.findOne({
            where: {
              email: payload.user.email
            }
          }).then(User => {
            if (!User) {
              res.send({
                msg: 'DB error'
              })
            } else {
              const token = jwt.sign({
                user: User
              }, authConfig.secret, {
                expiresIn: authConfig.expires
              })
              // console.log("token", User);
              // console.log(                                token);
              res.send({
                msg: 'updated',
                token,
                user: User
              })
            }
          }).catch(() => {
            res.send({
              msg: 'DB error'
            })
          })
        })
    } catch (error) {
      // console.error(error);
      res.send({
        msg: 'User does not exist'
      })
    }
  }
}

// delete user by email
// http://localhost:5000/users/delete
ProfileUsersController.deleteProfile = (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, authConfig.secret)
    User.destroy({
      where: {
        email: payload.user.email
      },
      truncate: false
    })
      .then(deleted => {
        if (deleted) {
          res.send({
            msg: 'deleted'
          })
        } else {
          res.send({
            msg: 'DB error'
          })
        }
      }).catch(() => {
        res.send({
          msg: 'User does not exist'
        })
      })
  } catch (error) {
    res.send({
      msg: 'DB error'
    })
  }
}

module.exports = ProfileUsersController
