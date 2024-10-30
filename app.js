const express = require('express');
const app = express();
const port = 5000;
const portIo = 4000;
const cors = require('cors');

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

app.use(express.json());
app.use(cors());

require('dotenv').config();

let connectedUsers = 0;

io.on("connection", (socket) => {
  console.log("a user connected");
  connectedUsers++;
  io.emit("userConnection", { message: "Usuario se acaba de conectar", count: connectedUsers });

  socket.on("disconnect", () => {
      console.log("user disconnected");
      connectedUsers--;
      io.emit("userConnection", { message: "Usuario se acaba de desconectar", count: connectedUsers });
  });

  socket.on("message", (msg) => {
      console.log(msg);
      io.emit("message", msg);
  });

  socket.on("userConnection", (msg) => {
      console.log(msg);
      io.emit("userConnection", msg);
  });
});


// SERVIDOR ===================================================================================================
const mongoose = require('mongoose');
const mongoDB =
  'mongodb+srv://' +
  process.env.DB_USER +
  ':' +
  process.env.DB_PASSWORD +
  '@' +
  process.env.DB_SERVER +
  '/' +
  process.env.DB_NAME +
  '?retryWrites=true&w=majority';
async function main() {
  await mongoose.connect(mongoDB);
}
main().catch((err) => console.log(err));


var users = require('./routes/user');
var room = require('./routes/room');
var bookings = require('./routes/bookings');
//var auth = require("./routes/auth");

app.use('/users', users);
app.use('/rooms', room);
app.use('/bookings', bookings);
// app.use("/register", auth);

app.get('/', (req, res) => {
  res.send('Creamos usuarios');
});

app.listen(port, () => {
  console.log(`Aplicación escuchando en puerto: ${port}`);
});

server.listen(portIo, () => {
  console.log(`WEB Socket escuchando en: ${portIo}`);
});
