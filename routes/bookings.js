const express = require('express')
const router = express.Router()

const bookingsController = require('../controllers/bookingsController.js')

router.post('/', bookingsController.createBooking )
router.get('/', bookingsController.retBookingsAll )
router.get('/:id', bookingsController.retBookingById )
router.put('/:id', bookingsController.updateBooking )
router.delete("/:id", bookingsController.deleteBooking)

module.exports = router