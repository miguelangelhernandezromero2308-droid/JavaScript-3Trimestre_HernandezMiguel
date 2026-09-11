const express = require('express');  
const app = express(); 
require('dotenv').config();
const port = process.env.PORT || 3030;

const jwt = require('jsonwebtoken');
const registroMiddleware = require('./middleware/registroMiddleware');
const manejadorErrores = require('./middleware/manejadroErrores');
const autenticacion = require('./middleware/autenticacion');

// Middlewares para parsear el body
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Middleware de registro propio
app.use((req, res, next) => {
  console.log(`Tiempo milisegundos: ${Date.now()}`);
  console.log(`Fecha y hora: ${new Date().toISOString()}`);
  console.log(`IP del cliente: ${req.ip}`);
  next();
});
app.use(registroMiddleware);

// Módulos para manejo de archivos
const sistemaArchivo = require('fs');
const ruta = require('path');
const rutaArchivo = ruta.join(__dirname, 'datos.json');

const multer = require('multer');

const almacenamiento = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'misImagenes/');   
  },
  filename: (req, file, cb) => {
    const extension = ruta.extname(file.originalname);
    cb(null, `${Date.now()}${extension}`);
  }
});

const cargar = multer({ storage: almacenamiento });

// RUtas
app.get("/", (req, res) => { 
  res.send('API REST APRENDICES');
});

// Endpoint para listar aprendices
app.get("/api/aprendices", (req, res) => {
  sistemaArchivo.readFile(rutaArchivo, 'utf-8', (error, datos) => {
    if (error) {
      return res.status(500).json({ mensaje: "Error al leer el archivo" });
    }
    const listaAprendices = JSON.parse(datos);     
    res.status(200).json({ "mensaje": listaAprendices });
  });
});

// Endpoint para listar un aprendiz por ID
app.get("/api/aprendices/:id", (req, res) => {      
  res.status(200).json({
    "mensaje": "Lista de un aprendiz"
  });
});  

// Endpoint para crear un aprendiz con imagen
app.post("/api/aprendices", cargar.single('imagen'), (req, res) => {
  const nuevoAprendiz = req.body;
  nuevoAprendiz.imagen = req.file ? `/misImagenes/${req.file.filename}` : "sin imagen";

  sistemaArchivo.readFile(rutaArchivo, 'utf-8', (error, datos) => {
    if (error) {
      return res.status(500).json({ mensaje: "Error al leer el archivo" });
    }
    const listaAprendices = JSON.parse(datos); 
    listaAprendices.push(nuevoAprendiz);

    sistemaArchivo.writeFile(rutaArchivo, JSON.stringify(listaAprendices, null, 2), (error) => {
      if (error) {
        return res.status(500).json({ mensaje: "No se puede escribir en el archivo, o BD" });
      }
      res.status(201).json({ "mensaje": "Aprendiz creado", "datos aprendiz": nuevoAprendiz });
    });
  });
});

// Endpoint para actualizar un aprendiz
app.put("/api/aprendices/:id", (req, res) => {
  res.status(200).json({
    "mensaje": "Actualizar aprendiz"
  });
});

// Endpoint para eliminar aprendiz
app.delete("/api/aprendices/:id", (req, res) => {
  res.status(200).json({
    "mensaje": "Eliminar aprendiz"
  });
});     

app.get("/Error", (req, res, next) => {
  next(new Error("Error generado intencionalmente"));
});



app.post("/rutaJson", (req, res) => {
  const todosDatos = req.body;
  const edad = req.body.edad2;
  if (edad >= 18) {
    res.json({ mensaje: "Es mayor de edad" });
  } else {
    res.json({ datosJson: todosDatos });
  }
});

app.post("/rutaFormulario", (req, res) => {
  const todosDatos = req.body;
  const programa = req.body.programa;
  res.json({ todosDatos: todosDatos, Miprograma: programa });
});

// Ruta protegida
app.get("/rutaProtegida", autenticacion, (req, res) => { 
  res.status(200).json({ mensaje: "Esta es mi ruta protegida !!!" });
});

//ruta para inicio de secion
app.post("/api/login", (req, res) => {
  const UsuarioBD = {
    "usuario": "miguel",
    "clave": "1234"
  }
  const { usuario, clave } = req.body;
  if (usuario !== UsuarioBD.usuario || clave !== UsuarioBD.clave) {
    return res.status(401).json({ Error: "Usuario o contraseña incorrectos" }); 
  }

  const token = jwt.sign(
    { usuario: usuario },
    process.env.JWT_SECRET || "secreto_respaldo",
    { expiresIn: '1h' }
  );

  return res.json({ token: token });
});
  

// EL MANEJADOR DE ERRORES SIEMPRE VA AL FINAL DE TODAS LAS RUTAS
app.use(manejadorErrores);

app.listen(port, () => { 
  console.log(`SERVIDOR: http://localhost:${port}`);
});