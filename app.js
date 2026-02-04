require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const { v2: cloudinary } = require('cloudinary');
const multer = require('multer');

const app = express();
const server = http.createServer(app);

const PORT_API = process.env.PORT || 5000;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"]
  }
});

let connectedUsers = 0;

io.on("connection", (socket) => {
  connectedUsers++;
  io.emit("userConnection", { message: "Usuario se conectó", count: connectedUsers });

  socket.on("disconnect", () => {
    connectedUsers--;
    io.emit("userConnection", { message: "Usuario se desconectó", count: connectedUsers });
  });

  socket.on("message", (msg) => io.emit("message", msg));
  socket.on("userConnection", (msg) => io.emit("userConnection", msg));
});

const mongoURI= `${process.env.MONGO_URI}`

mongoose.connect(mongoURI)
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch(err => console.error("Error conectando a MongoDB:", err));

const usersRouter = require('./routes/user');
const roomsRouter = require('./routes/room');
const bookingsRouter = require('./routes/bookings');

app.use('/users', usersRouter);
app.use('/rooms', roomsRouter);
app.use('/bookings', bookingsRouter);

app.post('/upload', upload.array('image'), async (req, res) => {
  try {
    const uploadPromises = req.files.map(file => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: "hotel_uploads" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        });
        stream.end(file.buffer);
      });
    });

    const results = await Promise.all(uploadPromises);
    res.send({ message: "Upload exitoso", urls: results.map(r => r.secure_url) });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error subiendo archivos a Cloudinary");
  }
});

app.get('/', (req, res) => {
  res.send('API funcionando');
});

server.listen(PORT_API, () => {
  console.log(`Servidor API + Socket.io escuchando en puerto ${PORT_API}`);
});
