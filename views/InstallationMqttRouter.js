const express = require('express')
const router = express.Router()

const InstallationModbusTCPController = require('../controllers/InstallationMqttController')

// CLIENT ADMIN PROFILE VIEW

// read users userInstallation
router.get('/communication', InstallationModbusTCPController.communication)
// http://localhost:5000/installation/userInstallation

// router.post('/graphData', InstallationModbusTCPController.graphData)

// router.post('/alarmsData', InstallationModbusTCPController.alarmsData)

// //read users userInstallation
// router.post('/systemOnOff',  InstallationModbusTCPController.systemOnOff);
// //http://localhost:5000/installation/userInstallation

// //read users userInstallation
// router.post('/writeBitHoldingRegisters',  InstallationModbusTCPController.writeBitHoldingRegisters);
// //http://localhost:5000/installation/userInstallation

// //read users userInstallation
// router.post('/readHoldingRegisters',  InstallationModbusTCPController.readHoldingRegisters);
// //http://localhost:5000/installation/userInstallation

// //read users userInstallation
// router.post('/writeHoldingRegisters',  InstallationModbusTCPController.writeHoldingRegisters);
// //http://localhost:5000/installation/userInstallation

module.exports = router
