const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    resRef : { type: Number, required: true },
    totalprice : { type: Number, required: true },
    checkin : { type: Date, required: true },
    checkout : { type: Date, required: true },
    username : { type: String, required: true },
    guest : { type: String, required: true },
    status : { type: String, required: true },
    adults : { type: Number, required: true },
    kids : { type: Number, required: true },
    roomNum : { type: Number, required: true },
    payMeth : { type: String, required: true },
    notes : { type: String }   
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bookings", userSchema);