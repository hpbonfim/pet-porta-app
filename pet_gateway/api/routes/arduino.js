const express = require("express")
const router = express.Router()

const ArduinoController = require('../controllers/arduino')
const checkAuth = require('../middleware/check-auth')

router.get("/abrir", ArduinoController.abrir)

module.exports = router