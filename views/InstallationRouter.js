const express = require('express');
const router = express.Router();


const InstallationController = require('../controllers/InstallationController');


//CLIENT ADMIN PROFILE VIEW



// //read users userInstallation
// router.post('/userInstallation',  InstallationController.userInstallation);
// //http://localhost:5000/installation/userInstallation

// //read users userInstallation
// router.post('/readInstallation',  InstallationController.readInstallation);
// //http://localhost:5000/installation/userInstallation

//read users userInstallation
router.post('/writeCoils',  InstallationController.writeCoils);
//http://localhost:5000/installation/userInstallation

//read users userInstallation
router.post('/readCoils',  InstallationController.readCoils);
//http://localhost:5000/installation/userInstallation


router.post('/readDiscreteInputs',  InstallationController.readDiscreteInputs);
//http://localhost:5000/installation/userInstallation

//read users userInstallation
router.post('/writeHoldingRegisters',  InstallationController.writeHoldingRegisters);
//http://localhost:5000/installation/userInstallation

router.post('/readHoldingRegisters',  InstallationController.readHoldingRegisters);
//http://localhost:5000/installation/userInstallation

//read users userInstallation
router.post('/readInputRegisters',  InstallationController.readInputRegisters);
//http://localhost:5000/installation/userInstallation











module.exports = router;
