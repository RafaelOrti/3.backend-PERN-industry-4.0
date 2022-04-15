const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const UsersController = require('../controllers/ProfileUsersController');


//USERS PROFILE VIEW

//read profile
router.get('/profile', auth, ProfileUsersController.readProfile);
//http://localhost:5000/users/profile

//update profile
router.put('/update', auth, ProfileUsersController.updateProfile);
//http://localhost:5000/users/update

//delete user by email
router.delete('/delete', auth, ProfileUsersController.deleteProfile);
//http://localhost:5000/users/delete

 