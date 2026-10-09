const registroMiddleware = (req, res, next) => {
    const flecha = new Date();
    console.log(`[Historial de peticiones] ${flecha}, ${req.method}, ${req.url}, ${req.ip}`);
    next();
}

module.exports = registroMiddleware