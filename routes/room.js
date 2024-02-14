const express = require('express')
const router = express.Router()

const roomController = require('../controllers/roomController.js')

router.post('/', roomController.createRoom )
router.get('/', roomController.retRoomsAll )
router.get('/:id', roomController.retRoomById )
router.put('/:id', roomController.updateRoom )
router.delete("/:id", roomController.deleteRoom)

module.exports = router