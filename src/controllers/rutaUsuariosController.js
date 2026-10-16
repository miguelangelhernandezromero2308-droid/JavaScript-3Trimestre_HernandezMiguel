// 1. Importamos el servicio que creaste en la carpeta services
const listarUsuariosService = require('../services/usuariosService');

// Controlador para listar usuarios
const mostrarRutaUsuarios = async (req, res) => {
    try {
        const usuarios = await listarUsuariosService();
        res.status(200).json({ 
            mensaje: "Usuarios obtenidos con éxito",
            usuarios 
        });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al listar los usuarios" });
    }
};

// Controlador para registrar usuarios
const registrarController = async (req, res) => {
    try {
        const { nombre, cargo } = req.body;
        
        // Respuesta provisional mientras implementan la lógica de guardado
        res.status(201).json({ 
            mensaje: "Usuario recibido para registro",
            datos: { nombre, cargo }
        });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al registrar el usuario" });
    }
};

// Controlador para inicio de sesión
const loginController = async (req, res) => {
    try {
        res.status(200).json({ mensaje: "Usuario logueado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al iniciar sesión" });
    }
};

// 2. Exportamos las 3 funciones para que el router las pueda usar
module.exports = { 
    mostrarRutaUsuarios, 
    registrarController, 
    loginController 
};