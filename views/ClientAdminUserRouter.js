const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isClientAdmin = require("../middlewares/isClientAdmin");
const ClientAdminUsersController = require('../controllers/ClientAdminUsersController');


//CLIENT ADMIN PROFILE VIEW

//read users clientAdmin
router.get('/client', auth, isClientAdmin, ClientAdminUsersController.clientAdminReadUsers);
//http://localhost:5000/users

//create new user clientAdmin
router.post('/client', auth, isClientAdmin, ClientAdminUsersController.clientAdminCreateUser);
//http://localhost:5000/users

//update profile by email clientAdmin
router.put('/client/update', auth, isClientAdmin, ClientAdminUsersController.clientAdminUpdateUser);
//http://localhost:5000/users/email/:email

//delete user by email clientAdmin
router.delete('/client/delete', auth, isClientAdmin, ClientAdminUsersController.clientAdminDeleteUser);
//http://localhost:5000/users/:email

module.exports = router;