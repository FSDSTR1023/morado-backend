const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

require("dotenv").config();
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

console.log(mongoDB, "mongodb");
async function main() {
  await mongoose.connect(mongoDB);
}

main().catch((err) => console.log(err));

app.get("/", (req, res) => {
  console.log(process.env.DB_USER);
  res.send("Task API backend");
});

app.listen(port, () => {
  console.log("server running on port : ", port);
});
