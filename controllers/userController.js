const { err } = require("console");
const user = require("../models/user.model");


// ===============================    POST    ==============================
// *************************************************************************
async function createUser(req, res) {
  user
    .create(req.body)
    .then((userDoc) => {
      console.log(`user create worked well: ${userDoc}`);
      res.status(200).json(userDoc);
    })
    .catch((err) => {
      console.log(`Creating a new user went wrong! Try again 😞 ${err}`);
      res.status(400).json(err);
    });
}

module.exports = {
    createUser,
  };
