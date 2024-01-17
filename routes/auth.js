const express = require('express')
const router = express.Router()

const auth = require('../controllers/authController.js')

router.post("/", auth.register)
// router.post("/", auth.login)

module.exports = router