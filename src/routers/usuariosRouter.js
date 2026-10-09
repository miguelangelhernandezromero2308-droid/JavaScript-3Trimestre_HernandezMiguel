const { Router } = require('express');
const enrutador = Router();
// Importamos el controlador correcto
const { mostrarRutaUsuarios } = require('../controllers/rutaUsuariosController');

enrutador.get('/listado', mostrarRutaUsuarios);

module.exports = enrutador;