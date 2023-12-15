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

module.exports = {
    createUser,
  };
