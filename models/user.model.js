const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var userSchema = new Schema({

    nombre: String,
    biografia: String,
    fecha_de_nacimiento: Date,
    nacionalidad: String,


}); 

module.exports = mongoose.model('User', userSchema);