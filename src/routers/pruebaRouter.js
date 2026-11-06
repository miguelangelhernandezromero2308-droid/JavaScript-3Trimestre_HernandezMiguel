//ruta de solo prueba
const {Router}= require ("express")
const enrutador = Router() 
const mostrarRuta = require("../controllers/rutaPruebaController")

//FUNCION (req,res) dbeer ir en el controlador
enrutador.get("/rutaPersonal",mostrarRuta)

module.exports = enrutador