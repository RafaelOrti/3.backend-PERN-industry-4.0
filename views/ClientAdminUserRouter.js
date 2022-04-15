const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const UsersController = require('../controllers/ClientAdminUsersController');


//CLIENT ADMIN PROFILE VIEW

//read users admin
router.get('/client', auth, isAdmin, ClientAdminUsersController.adminReadUsers);
//http://localhost:5000/users

//create new user admin
router.post('/client', auth, isAdmin, ClientAdminUsersController.adminCreateUser);
//http://localhost:5000/users

//update profile by email admin
router.put('/client/email/:email', auth, isAdmin, ClientAdminUsersController.adminUpdateUser);
//http://localhost:5000/users/email/:email

//delete user by email admin
router.delete('/client/:email', auth, isAdmin, ClientAdminUsersController.adminDeleteUser);
//http://localhost:5000/users/:email