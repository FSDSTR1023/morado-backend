const { err } = require("console");
const booking = require("../models/bookings.model.js");

// ===============================    POST    ==============================
// *************************************************************************
async function createBooking(req, res) {
  booking
    .create(req.body)
    .then((bookingDoc) => {
      console.log(`Reservacion creada correctamente: ${bookingDoc}`);
      res.status(200).json(bookingDoc);
    })
    .catch((err) => {
      console.log(`La nueva reservación ha fallado, intentalo de nuevo 😞 ${err}`
      );
      res.status(400).json(err);
    });
}

// ===============================    GET     ==============================
// All rooms _______________________________________________________________
async function retBookingsAll(req, res) {
  booking
    .find({})
    .then((bookingDoc) => {
      console.log("Found this: ", bookingDoc);
      res.status(200).json(bookingDoc);
    })
    .catch((err) => {
      console.log(
        "Error al intentar obtener la información de todas las habitaciones ",
        err
      );
      res.status(400).json(err);
    });
}

// Room per ID _____________________________________________________________
async function retBookingById(req, res) {
  booking
    .findById(req.params.id)
    .then((bookingDoc) => {
      console.log("Found this user by the ID: ", bookingDoc);
      res.status(200).json(bookingDoc);
    })
    .catch((err) => {
      console.log(
        "Error al intentar obtener la información del usuario: ",
        err
      );
      res.status(400).json(err);
    });
}

// ===============================    PUT    ===============================
// *************************************************************************
async function updateBooking(req, res) {
  booking
    .findByIdAndUpdate(req.params.id, { $set: req.body })
    .then((updatedBooking) => {
      console.log("updated Room: ", updatedBooking);
      res.status(200).json(updatedBooking);
    })
    .catch((err) => {
      console.log("Error while updating the room ", err);
      res.status(400).json(err);
    });
}

// ===============================   DELETE  ===============================
// *************************************************************************
async function deleteBooking(req, res) {
  booking
    .findByIdAndDelete(req.params.id)
    .then((deletedBooking) => {
      console.log("Deleted User: ", deletedBooking);
      res.status(200).json(deletedBooking);
    })
    .catch((err) => {
      console.log("Error while deleting the room: ", err);
      res.status(400).json(err);
    });
}

module.exports = {
    createBooking,
    retBookingsAll,
    retBookingById,
    updateBooking,
    deleteBooking
};
