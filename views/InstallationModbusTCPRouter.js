const express = require('express')
const router = express.Router()

const InstallationModbusTCPController = require('../controllers/InstallationModbusTCPController')

// CLIENT ADMIN PROFILE VIEW

// read users userInstallation
router.get('/communication', InstallationModbusTCPController.communication)
// http://localhost:5000/installation/communication

router.post('/graphData', InstallationModbusTCPController.graphData)
// http://localhost:5000/installation/graphData

router.post('/alarmsData', InstallationModbusTCPController.alarmsData)
// http://localhost:5000/installation/alarmsData

module.exports = router
