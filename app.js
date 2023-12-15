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
app.use("/users/", users);

app.get("/", (req, res) => {
  res.send("Task API backend");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
