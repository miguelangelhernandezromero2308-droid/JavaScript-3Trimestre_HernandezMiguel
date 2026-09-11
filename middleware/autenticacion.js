const jswtoken = require('jsonwebtoken');
const autenticacion = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = req.header['autenticacion'] || req.get('token') || (authHeader && authHeader.split(' ')[1]);

    if (!token) {
        return res.status(401).json({ Error: "Acceso denegado, no provee token" }); 
    }
    jswtoken.verify(token, process.env.JWT_SECRET, (error, usuario) => {
        if (error) {
            return res.status(403).json({ Error: "Acceso denegado, token inválido" }); 
        }
        req.usuario = usuario;
        next();
    });
}

module.exports = autenticacion;