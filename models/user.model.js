const mongoose = require("mongoose");
const { stringify } = require("querystring");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require ("jsonwebtoken");


const UserSchema = new Schema({
  nameu: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // DoB:{type: Date, required: true},
  DoB:{type: String, required: true},
  country: { type: String, required: true },
  docType: { type: String, required: true },
  docNum: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  pwd: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
}, {
  timestamps:true
});

//metodo statico de signup

UserSchema.statics.signup = async function (nameu, lastName, phone, email, DoB, country, docType, docNum, username, isAdmin, pwd) {

  const exists = await this.findOne({email})

  if (exists) {
    throw Error ('El email ya está registrado')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(pwd, salt)

  const user = await this.create({nameu, lastName, phone, email, DoB, country, docType, docNum, username, isAdmin, pwd:hash})

  return user

}

UserSchema.methods.comparePassword = function (pwd) {
  
  // console.log('pwd', pwd)
  return bcrypt.compareSync(pwd, this.pwd);
};

UserSchema.methods.generateJWT = function () {
  // console.log('this', this)
  const today = new Date();
  const expirationDate = new Date();

  expirationDate.setDate(today.getDate() + 60);

  let payload = {
    id: this._id,
    email: this.email,
    username: this.username,
  };
  // method from the json-web-token library (who is in charge to generate the JWT)
  // console.log('secret', process.env.JWT_SECRET)
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10),
  });
};


module.exports = mongoose.model("User", UserSchema);
