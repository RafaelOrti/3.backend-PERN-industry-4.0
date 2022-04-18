const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const AdminUsersController = require('../controllers/AdminUsersController');


//ADMIN PROFILE VIEW


//read users admin
router.get('/admin', AdminUsersController.adminReadUsers);
//http://localhost:5000/users

//create new user admin
router.post('/admin', auth, isAdmin, AdminUsersController.adminCreateUser);
//http://localhost:5000/users

//update profile by email admin
router.put('/admin/update', auth, isAdmin, AdminUsersController.adminUpdateUser);
//http://localhost:5000/users/email/:email

//delete user by email admin
router.delete('/admin/delete', auth, isAdmin, AdminUsersController.adminDeleteUser);
//http://localhost:5000/users/:email

module.exports = router;