require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

// Conexión a la base de datos
(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI_TEST, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Te has conectado a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
    }
})();

// Ruta estática para los archivos CSS
app.use('/css', express.static(path.resolve(__dirname, 'css')));

// Ruta estática para los archivos de imagen
app.use('/img', express.static(path.resolve(__dirname, 'img')));

// Ruta estática para los archivos JavaScript
app.use('/js', express.static(path.resolve(__dirname, 'Js')));

// Ruta estática para los archivos de Leaflet
app.use('/leaflet', express.static(path.resolve(__dirname, 'leaflet')));

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta de inicio que sirve el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// Ruta para productos.html
app.get('/productos.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'productos.html'));
});

// Ruta para servicios.html
app.get('/servicios.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'servicios.html'));
});

// Ruta para contacto.html
app.get('/contacto.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contacto.html'));
});

// Ruta para admin.html
app.get('/admin.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin.html'));
});

// Ruta para cargar y servir db.json
app.get('/db.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'db.json'));
});

// Ruta para cargar y servir db2.json
app.get('/db2.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'db2.json'));
});

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).send('Página no encontrada');
});

// Puerto de escucha
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});
