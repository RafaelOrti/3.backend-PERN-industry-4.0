const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const UsersController = require('../controllers/UsersController');


//CRUD USERS

//FIRST VIEW LOGIN

//register users
router.post('/register', UsersController.register);
//http://localhost:5000/users/register

//log in
router.post('/login', UsersController.login);
//http://localhost:5000/users/login



//USERS PROFILE VIEW



//delete user by email
router.delete('/:email', auth, isAdmin, UsersController.delete);
//http://localhost:5000/users/:email

//delete user by name
router.delete('/name/:name', auth, isAdmin, UsersController.deleteByName);
//http://localhost:5000/users/name/:name


//ADMIN PROFILE VIEW

//read users
router.get('/', auth, isAdmin, UsersController.read);
//http://localhost:5000/users



