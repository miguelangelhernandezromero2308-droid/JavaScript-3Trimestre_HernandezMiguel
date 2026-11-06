const {listarUsuarios,listarUsuarioPorId, crearUsuario, actualizarUsuario, eliminarUsuario, autenticar} = require("../services/usuariosService")
const encriptacion = require("bcryptjs")
const jwtoken = require("jsonwebtoken");

//Listar usuarios
const mostrarRutaUsuarios = async (req,res)=>{

    try{
        const usuarios = await listarUsuarios()
        res.json(usuarios)
    }catch(error){
        res.status(500).json({mensaje:"Error al comunicarse con la base de datos.",Error:error.message})
        }
    
    //res.json({mensaje:" Estos son los usurios"})
}

//Listar usuarios por id

const mostrarUsuarioPorId = async (req,res)=>{
    const { id } = req.params;
    try{
        const usuarios = await listarUsuarioPorId(id)
        if(usuarios){
            res.json(usuarios)
        }else{
            res.status(404).json({mensaje:"Usuario no encontrado"})
        }
    }catch(error){
        res.status(500).json({mensaje:"Error al comunicarse con la base de datos.",Error:error.message})
    }
}

//Crear usuarios

const crearUsuarioController = async (req,res) =>{
    const { email, name, clave } = req.body;
    try{
        const usuarios = await crearUsuario(email,name,clave)
        res.status(201).json({
            mensaje: "Usuario creado exitosamente",
            nuevoUsuario: usuarios
        })
    }catch(error){
        res.status(500).json({mensaje:"Error no se pueden crear usuarios", Error:error.message})
    }
}

// Actualizar usuario
const actualizarUsuarioController = async (req, res) => {
    const { id } = req.params;
    const { email, name, clave } = req.body;
    try{
        const usuarios = await actualizarUsuario(id, { email, name, clave });
        res.status(200).json({
            mensaje: "Usuario actualizado exitosamente",
            usuarioActualizado: usuarios
        });
    }catch(error){
        res.status(500).json({mensaje:"Error al actualizar el usuario", Error:error.message})
    }
}

// Eliminar Usuarios

const eliminarUsuarioController = async (req, res) => {
    const { id } = req.params;
    try{
        const usuarios = await eliminarUsuario(id);
        res.status(200).json({
            mensaje: "Usuario eliminado exitosamente",
            usuarioEliminado: usuarios
        });
    }catch(error){
        res.status(500).json({mensaje:"Error al eliminar el usuario", Error:error.message})
    }
}

//ruta de registrarse
const registrarController = async(req,res)=>{
    res.json({mensaje:" Ruta de registrarse"})
}

//ruta de login

const loginController = async (req, res) => {
    const { email, clave } = req.body;
    try {
        const autenticarUsuario = await autenticar(email);

        if (!autenticarUsuario) {
            return res.status(404).json({mensaje: "Usuario no encontrado"});
        }
        const validarClave = await encriptacion.compare(clave,autenticarUsuario.clave);

        if (!validarClave) {
            return res.status(401).json({mensaje: "Credenciales incorrectas"});
        }

        const token = jwtoken.sign(
            {id: autenticarUsuario.id,email: autenticarUsuario.email},
            process.env.JWT_SECRET,{ expiresIn: "1h" }
        );
        return res.status(200).json({mensaje: "Autenticación exitosa",token: token});

    } catch (error) {
        return res.status(500).json({mensaje: "No se pudo autenticar",Error: error.message});
    }
};
module.exports = {mostrarRutaUsuarios, mostrarUsuarioPorId,crearUsuarioController,actualizarUsuarioController,eliminarUsuarioController,registrarController, loginController}