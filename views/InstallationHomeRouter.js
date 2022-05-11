const express = require('express');
const router = express.Router();


const InstallationHomeController = require('../controllers/InstallationHomeController');


//CLIENT ADMIN PROFILE VIEW


//read users userInstallation
router.post('/homeUserInstallation',  InstallationHomeController.userInstallation);
//http://localhost:5000/installation/userInstallation

//read users userInstallation
router.post('/homeOn',  InstallationHomeController.homeOn);
//http://localhost:5000/installation/userInstallation

// //read users userInstallation
// router.post('/homeOff',  InstallationHomeController.homeOff);
// //http://localhost:5000/installation/userInstallation

//read users userInstallation
router.post('/homePreservation',  InstallationHomeController.homePreservation);
//http://localhost:5000/installation/userInstallation

// //read users userInstallation
// router.post('/homeDegreening',  InstallationHomeController.homeDegreening);
// //http://localhost:5000/installation/userInstallation


router.get('/homeValueReading',  InstallationHomeController.homeValueReading);
//http://localhost:5000/installation/userInstallation

//read users userInstallation
router.get('/homeAlarmsReading',  InstallationHomeController.homeAlarmsReading);
//http://localhost:5000/installation/userInstallation












module.exports = router;
