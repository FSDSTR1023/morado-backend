const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    roomNum: { type: Number, required: true },
    title: { type: String, required: true },
    isSuite: { type: Boolean, default: false },
    roomType: { type: String, required: true },
    desc: { type: String, required: true },
    amenities: { type: [String], required: true },
    rate: { type: Number, required: true },
    maxPeople: { type: Number, required: true },
    status: { type: String, required: true },
    bedNum: { type: Number, required: true },
    bedType: { type: String, required: true },
    photos: { type: [String] }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", roomSchema);
