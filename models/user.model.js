// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// var userSchema = new Schema({

//     nombre: String,
//     biografia: String,
//     // fecha_de_nacimiento: Date,
//     nacionalidad: String

// }); 

// module.exports = mongoose.model('user', userSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const status = {
//   PENDING: 'PENDING',
//   IN_PROGRESS: 'IN PROGRESS',
//   COMPLETED: 'COMPLETED'
// };

const userSchema = new Schema({
  nombre: String,
  apellido: String,
  nacionalidad: String,
});

module.exports = mongoose.model("User", userSchema);