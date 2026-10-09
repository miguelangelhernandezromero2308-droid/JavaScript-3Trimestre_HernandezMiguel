require("dotenv").config();
const express = require('express');
const enrutador = require('./routers');
const registroMiddleware = require('./middleware/registroMiddleware');
const manejadorErrores = require('./middleware/manejadroErrores');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Registra en consola cada petición que llega
app.use(registroMiddleware);

// Rutas principales
app.use("/api", enrutador);

app.get("/", (req, res) => {
  res.send('API REST funcionando correctamente');
});

// Siempre al final para atrapar cualquier error
app.use(manejadorErrores);

module.exports = app;