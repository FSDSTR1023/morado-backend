const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const bcrypt = require("bcryptjs");

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

// userSchema.statics.encryptPassword = async (password) => {
//   const salt = await bcrypt.genSalt(10)
//   return await bcrypt.hash(password, salt)
// }

// userSchema.statics.comparePassword = async (password, receivedPassword) => {
//   return await bcrypt.compare (password, receivedPassword)
// }



module.exports = mongoose.model("User", userSchema);
