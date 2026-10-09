require('dotenv').config();
const manejadorErrores = (error, req, res, next) => {
    const codigoEstado = error.statusCode || 500;
    const mensaje = error.message || 'Error inesperado !!';
    console.error(`[ERROR] - ${new Date().toISOString()}, - ${codigoEstado} - ${mensaje}`);
    //Validar si hay mas informacion 
    if(error.stack){
        console.error(error.stack);
    }
    //respuesta en JSON
    res.json({
        Error : "ERROR", codigoEstado, mensaje,
        //depenediendo si estamos en desarrollo o produccion
        ...(process.env.NODE_ENV === "development" && {stack: error.stack})
    })
}

module.exports = manejadorErrores