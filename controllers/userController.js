const { err } = require("console");
const user = require("../models/user.model");


// ===============================    POST    ==============================
// *************************************************************************
async function createUser(req, res) {
  user
    .create(req.body)
    .then((userDoc) => {
      console.log(`Usuario creado correctamente: ${userDoc}`);
      res.status(200).json(userDoc);
    })
    .catch((err) => {
      console.log(`La creacion de un nuevo usuario ha fallado, intentalo de nuevo 😞 ${err}`);
      res.status(400).json(err);
    });
}

// ===============================    GET     ==============================
// All users _______________________________________________________________
async function retUsersAll(req, res) {
  user
    .find({
    })
    .then((userDoc) => {
      console.log("Found this: ", userDoc);
      res.status(200).json(userDoc);
    })
    .catch((err) => {
      console.log("Error while getting the users: ", err);
      res.status(400).json(err);
    });
}

// User per ID _____________________________________________________________
async function retUserById(req, res) {
  user
    .findById(req.params.id)
    .then((userDoc) => {
      console.log("Found this user by the ID: ", userDoc);
      res.status(200).json(userDoc);
    })
    .catch((err) => {
      console.log("Error while getting the users: ", err);
      res.status(400).json(err);
    });
}

// ===============================    PUT    ===============================
// *************************************************************************
async function updatedUser(req, res) {
  user
    .findByIdAndUpdate(
      req.params.id,
      {$set: req.body,},
    )
    .then((updatedUser) => {
      console.log("updated User: ", updatedUser);
      res.status(200).json(updatedUser);
    })
    .catch((err) => {
      console.log("Error while updating the user ", err);
      res.status(400).json(err);
    });
}

// ===============================   DELETE  ===============================
// *************************************************************************
async function deleteUser(req, res) {
  user.findByIdAndDelete(req.params.id)
    .then((deletedUser) => {
      console.log("Deleted User: ", deletedUser);
      res.status(200).json(deletedUser);
    })
    .catch((err) => {
      console.log("Error while deleting the user: ", err);
      res.status(400).json(err);
    });
}


module.exports = {
  createUser,
  retUsersAll,
  retUserById,
  updatedUser,
  deleteUser
};