require('dotenv').config();

const manejadorErrores = (error, req, res, next) => {
    const codigoEstado = error.statusCode || 500;
    const mensaje = error.message || 'Error inesperado !';
    console.log(`ERROR: ${new Date().toISOString()} ${codigoEstado} - ${mensaje}`); 

    if(error.stack){
        console.log(error.stack);
    }
    res.json({
        Error: "ERROR", 
        codigoEstado, 
        mensaje,
        ...(process.env.NODE_ENV === 'development' && {stack: error.stack})
    });
};

module.exports = manejadorErrores;