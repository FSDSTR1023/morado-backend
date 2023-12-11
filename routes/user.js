// const express = require('express');
// const router = express.Router();

// router.get('/', (req, res) => {
//     res.send('USER LIST');
// });

// module.exports = router;

const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController.js')

router.post('/', userController.createUser)


module.exports = router