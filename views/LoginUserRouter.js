const express = require('express')
const router = express.Router()
const LoginUsersController = require('../controllers/LoginUsersController')

// CRUD USERS

// FIRST VIEW LOGIN

// register users
router.post('/register', LoginUsersController.register)
// http://localhost:5000/users/register

// log in
router.post('/login', LoginUsersController.login)
// http://localhost:5000/users/login

// optional to make email confirmation
// //email confirmation
// router.post('/confirm', UsersController.confirm);
// //http://localhost:5000/users/confirm

module.exports = router
