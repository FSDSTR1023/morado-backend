const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nombre: String,
  apellido: String,
  nacionalidad: String,
  fechaDeNacimiento: Date
});

const UserDB = mongoose.model("User", userSchema);

module.exports = UserDB;
