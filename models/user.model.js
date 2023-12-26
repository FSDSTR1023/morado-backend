const mongoose = require("mongoose");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  DoB:{type:Date, required: true},
  country: { type: String, required: true },
  docType: { type: String, required: true },
  docNum: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  pwd: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
}, {
  timestamps:true
});

module.exports = mongoose.model("User", userSchema);