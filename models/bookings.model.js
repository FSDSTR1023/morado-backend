const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(  

{
  resRef : { type: String , required: true },
  user: { type: String },
  resDetail:
          [{
            roomCode : { type: String, required: true },
            ratePerRoom : { type: Number, required: true },
            subtotal: { type: Number, required: true },
            resData : 
                    {
                      checkIn: { type: String, required: true },
                      checkOut: { type: String, required: true },
                      adults: { type: String, required: true },
                      kids: { type: String, required: true },
                      nights: { type: Number, required: true },
                    },
            userInfo :
                    {
                      gExtraInfo: { type: String },
                      gName: { type: String },
                      gLastName: { type: String },
                      gTypeDoc: { type: String },
                      gNumDoc: { type: String },
                      gTel: { type: Number },
                    }
          }],
  email: { type: String, required: true, validate: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  totalRate: { type: Number, required: true },
  resStatus: { type: String, required: true },
  creditCard: {
                cardProvider: { type: String, required: true },
                numCard: { type: String, required: true },
                cardHolder: { type: String, required: true },
                expiry: { type: String, required: true },
              }
},
{
  timestamps: true,
}

);

module.exports = mongoose.model("Bookings", userSchema);