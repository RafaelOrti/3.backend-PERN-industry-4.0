const express = require('express');
const router = express.Router();


const InstallationModbusTCPController = require('../controllers/InstallationModbusTCPController');


//CLIENT ADMIN PROFILE VIEW


//read users userInstallation
router.post('/homeUserInstallation',  InstallationModbusTCPController.userInstallation);
//http://localhost:5000/installation/userInstallation

//read users userInstallation
router.post('/systemOnOff',  InstallationModbusTCPController.systemOnOff);
//http://localhost:5000/installation/userInstallation

//read users userInstallation
router.post('/writeBitHoldingRegisters',  InstallationModbusTCPController.writeBitHoldingRegisters);
//http://localhost:5000/installation/userInstallation

//read users userInstallation
router.post('/readHoldingRegisters',  InstallationModbusTCPController.readHoldingRegisters);
//http://localhost:5000/installation/userInstallation

//read users userInstallation
router.post('/writeHoldingRegisters',  InstallationModbusTCPController.writeHoldingRegisters);
//http://localhost:5000/installation/userInstallation


router.get('/homeValueReading',  InstallationModbusTCPController.homeValueReading);
//http://localhost:5000/installation/userInstallation

//read users userInstallation
router.get('/homeAlarmsReading',  InstallationModbusTCPController.homeAlarmsReading);
//http://localhost:5000/installation/userInstallation












module.exports = router;
