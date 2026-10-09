//importar mi aplicación
const app = require('./app');

//verificar el puerto de las variables de entorno
const PUERTO = process.env.PORT || 3333

//imprimo por consola el link 
app.listen(PUERTO, () => {
    console.log(`MI SERVIDOR: http://localhost:${PUERTO}`)
})