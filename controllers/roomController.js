const { err } = require("console");
const room = require("../models/room.model.js");

// ===============================    POST    ==============================
// *************************************************************************
async function createRoom(req, res) {
  room
    .create(req.body)
    .then((roomDoc) => {
      console.log(`Habitación creada correctamente: ${roomDoc}`);
      res.status(200).json(roomDoc);
    })
    .catch((err) => {
      console.log(`La creacion de la nueva habitación ha fallado, intentalo de nuevo 😞 ${err}`);
      res.status(400).json(err);
    });
}

// ===============================    GET     ==============================
// All rooms _______________________________________________________________
async function retRoomsAll(req, res) {
  room
    .find({})
    .then((roomDoc) => {
      console.log("Found this: ", roomDoc);
      res.status(200).json(roomDoc);
    })
    .catch((err) => {
      console.log("Error al intentar obtener la información de todas las habitaciones ", err);
      res.status(400).json(err);
    });
}

// Room per ID _____________________________________________________________
async function retRoomById(req, res) {
  room
    .findById(req.params.id)
    .then((roomDoc) => {
      console.log("Found this user by the ID: ", roomDoc);
      res.status(200).json(roomDoc);
    })
    .catch((err) => {
      console.log("Error al intentar obtener la información del usuario: ", err);
      res.status(400).json(err);
    });
}

// ===============================    PUT    ===============================
// *************************************************************************
async function updateRoom(req, res) {
  room
    .findByIdAndUpdate(req.params.id, { $set: req.body })
    .then((updatedRoom) => {
      console.log("updated Room: ", updatedRoom);
      res.status(200).json(updatedRoom);
    })
    .catch((err) => {
      console.log("Error while updating the room ", err);
      res.status(400).json(err);
    });
}

// ===============================   DELETE  ===============================
// *************************************************************************
async function deleteRoom(req, res) {
  room
    .findByIdAndDelete(req.params.id)
    .then((deletedRoom) => {
      console.log("Deleted User: ", deletedRoom);
      res.status(200).json(deletedRoom);
    })
    .catch((err) => {
      console.log("Error while deleting the room: ", err);
      res.status(400).json(err);
    });
}

module.exports = {
  createRoom,
  retRoomsAll,
  retRoomById,
  updateRoom,
  deleteRoom
};
