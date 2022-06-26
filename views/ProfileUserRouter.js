const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const ProfileUsersController = require('../controllers/ProfileUsersController')

// USERS PROFILE VIEW

// read profile
router.get('/profile/read', auth, ProfileUsersController.readProfile)
// http://localhost:5000/users/profile

// update profile
router.put('/profile/update', auth, ProfileUsersController.updateProfile)
// http://localhost:5000/users/update

// delete user by email
router.delete('/profile/delete', auth, ProfileUsersController.deleteProfile)
// http://localhost:5000/users/delete

module.exports = router
