const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());
require("dotenv").config();

// SERVIDOR ===================================================================================================
const mongoose = require("mongoose");
const mongoDB =
  "mongodb+srv://" +
  process.env.DB_USER +
  ":" +
  process.env.DB_PASSWORD +
  "@" +
  process.env.DB_SERVER +
  "/" +
  process.env.DB_NAME +
  "?retryWrites=true&w=majority";
async function main() {
  await mongoose.connect(mongoDB);
}
main().catch((err) => console.log(err));

var users = require("./routes/user");
var room = require("./routes/room");
var bookings = require("./routes/bookings");

app.use("/users", users);
app.use("/rooms", room);
app.use("/bookings", bookings);

app.get("/", (req, res) => {
  res.send("Creamos usuarios");
});

app.listen(port, () => {
  console.log(`Aplicación escuchando en puerto: ${port}`);
});
