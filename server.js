require('dotenv').config();
const express = require('express');
const { v2: cloudinary } = require('cloudinary');
const multer = require('multer');
const path = require('path');
// Configurar Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const app = express();
const port = process.env.PORT || 3000;
// Configurar almacenamiento Multer (en memoria)
const storage = multer.memoryStorage();
const upload = multer({ storage });
// Ruta de carga de imágenes
// app.post('/upload', upload.single('image'), async (req, res) => {
    app.post('/upload', upload.array('image'), async (req, res) => {
try {
 // Cargar imagen a Cloudinary
const result = await cloudinary.uploader.upload_stream({
    folder: "demo_uploads",
}, (error, result) => {
    if (error) return res.status(500).send("Upload to Cloudinary failed");
    res.send({ message: "Upload successful", url: result.url });
    }).end(req.file.buffer);
    } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading file");
}
});
app.listen(port, () => {
console.log(`Server running on port ${port}`);
});