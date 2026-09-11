const registroMiddleware = (req, res, next) => {
  console.log(`Tiempo milisegundos: ${Date.now()}`);
  console.log(`Fecha y hora: ${new Date().toISOString()}`);
  next();
};