const express = require('express');
const router = express.Router();


const InstallationController = require('../controllers/InstallationController');


//CLIENT ADMIN PROFILE VIEW



//read users userInstallation
router.post('/userInstallation',  InstallationController.userInstallation);
//http://localhost:3000/installation/userInstallation

//read users userInstallation
router.post('/readInstallation',  InstallationController.readInstallation);
//http://localhost:3000/installation/userInstallation

//read users userInstallation
router.post('/writeCoil',  InstallationController.writeCoil);
//http://localhost:3000/installation/userInstallation

//read users userInstallation
router.post('/readCoil',  InstallationController.readCoil);
//http://localhost:3000/installation/userInstallation



module.exports = router;
