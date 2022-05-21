const express = require('express');
const router = express.Router();


const InstallationModbusTCPController = require('../controllers/InstallationModbusTCPController');


//CLIENT ADMIN PROFILE VIEW


//read users userInstallation
router.post('/homeUserInstallation',  InstallationModbusTCPController.userInstallation);
//http://localhost:5000/installation/userInstallation

//read users userInstallation
router.post('/homeOn',  InstallationModbusTCPController.homeOn);
//http://localhost:5000/installation/userInstallation

// //read users userInstallation
// router.post('/homeOff',  InstallationModbusTCPController.homeOff);
// //http://localhost:5000/installation/userInstallation

//read users userInstallation
router.post('/homePreservation',  InstallationModbusTCPController.homePreservation);
//http://localhost:5000/installation/userInstallation

// //read users userInstallation
// router.post('/homeDegreening',  InstallationModbusTCPController.homeDegreening);
// //http://localhost:5000/installation/userInstallation


router.get('/homeValueReading',  InstallationModbusTCPController.homeValueReading);
//http://localhost:5000/installation/userInstallation

//read users userInstallation
router.get('/homeAlarmsReading',  InstallationModbusTCPController.homeAlarmsReading);
//http://localhost:5000/installation/userInstallation












module.exports = router;
