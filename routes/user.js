const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController.js')
const { loginUser, signupUser } = require('../controllers/authController.js')

router.post('/', userController.createUser )
router.get('/', userController.retUsersAll )
router.get('/:id', userController.retUserById )
router.put('/:id', userController.updateUser )
router.delete("/:id", userController.deleteUser)

// login route authController
router.post('/login', loginUser)

//signup route authController
router.post('/signup', signupUser)

module.exports = router