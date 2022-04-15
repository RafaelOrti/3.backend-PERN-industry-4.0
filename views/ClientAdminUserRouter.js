const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const UsersController = require('../controllers/ClientAdminUsersController');


//CLIENT ADMIN PROFILE VIEW

//read users clientAdmin
router.get('/client', auth, isAdmin, ClientAdminUsersController.clientAdminReadUsers);
//http://localhost:5000/users

//create new user clientAdmin
router.post('/client', auth, isAdmin, ClientAdminUsersController.clientAdminCreateUser);
//http://localhost:5000/users

//update profile by email clientAdmin
router.put('/client/email/:email', auth, isAdmin, ClientAdminUsersController.clientAdminUpdateUser);
//http://localhost:5000/users/email/:email

//delete user by email clientAdmin
router.delete('/client/:email', auth, isAdmin, ClientAdminUsersController.clientAdminDeleteUser);
//http://localhost:5000/users/:email