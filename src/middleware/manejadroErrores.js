const manejadorErrores =(error,req,res,next) =>{
    const codigoEstado = error.statusCode || 500;
    const mensaje = error.message || "Error inesperado !!";
    console.error(`[Error] - ${codigoEstado} - ${mensaje}`);
    const fecha = new Date().toISOString();
    console.log(`[Historial de peticiones] ${fecha}, ${req.method}, ${req.url}, ${req.ip}`);
    next()

    //validar si hay mas información
    if (error.stack){
        console.error(error.stack)
    }
    //respuesta JSON
    res.json({
        Error: "Error",codigoEstado, mensaje,
        //dependiendo si estamos en desarrollo o produccion
        ...(process.env.NODE_ENV === "development" && {stack: error.stack})
    })
}

module.exports = manejadorErrores