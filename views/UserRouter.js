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

//optional to make email confirmation
// //email confirmation
// router.post('/confirm', UsersController.confirm);
// //http://localhost:5000/users/confirm

 

//USERS PROFILE VIEW

//read profile
router.get('/profile', auth, UsersController.readProfile);
//http://localhost:5000/users/profile

//update profile
router.put('/update', auth, UsersController.updateProfile);
//http://localhost:5000/users/update

//delete user by email
router.delete('/delete', auth, UsersController.deleteProfile);
//http://localhost:5000/users/delete

 
//ADMIN PROFILE VIEW

//read users admin
router.get('/', auth, isAdmin, UsersController.usersRead);
//http://localhost:5000/users

//create new user admin
router.post('/', auth, isAdmin, UsersController.adminUserCreate);
//http://localhost:5000/users

//update profile by email admin
router.put('/email/:email', auth, isAdmin, UsersController.adminUserUpdateByEmail);
//http://localhost:5000/users/email/:email

//delete user by email admin
router.delete('/:email', auth, isAdmin, UsersController.adminUserDelete);
//http://localhost:5000/users/:email


