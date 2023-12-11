const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nombre: String,
  apellido: String,
  nacionalidad: String
});

module.exports = mongoose.model("User", userSchema);