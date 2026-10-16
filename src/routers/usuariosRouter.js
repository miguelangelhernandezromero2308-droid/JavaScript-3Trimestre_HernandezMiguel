const { Router } = require('express');
const enrutador = Router();
// Importamos el controlador correcto
const { mostrarRutaUsuarios, registrarController, loginController } = require('../controllers/rutaUsuariosController');

enrutador.get('/listado', mostrarRutaUsuarios);
enrutador.post("/registrar", registrarController);
enrutador.post("/login", loginController);


module.exports = enrutador;