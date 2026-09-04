const express = require('express');  
const app = express(); 
require('dotenv').config();
const port = process.env.PORT || 3030;

// Middlewares para parsear el body (van antes de definir cualquier ruta)
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Modulos para manejo de archivos
const sistemaArchivo = require('fs');
const ruta = require('path');
const rutaArchivo = ruta.join(__dirname, 'datos.json');

app.get("/", (req, res) => { 
  res.send('API REST APRENDICES');
});

//endpoint para  listar de aprendices

app.get("/api/aprendices", (req, res) => {
    sistemaArchivo.readFile(rutaArchivo, 'utf-8', (error, datos) => {
        if (error) {
            return res.status(500).json({ mensaje: "Error al leer el archivo" });
        }
        const listaAprendices = JSON.parse(datos)     
        res.status(200).json({"mensaje": listaAprendices})
  })
})

//endpoint para listar un aprendiz

app.get("/api/aprendices/:id", (req, res) => {      
    res.status(200).json({
        "mensaje": "Lista de un aprendiz"
    })
})  

//endpoint para crear un aprendiz

app.post("/api/aprendices", (req, res) => {
    const nuevoAprendiz = req.body;

    // Leer archivo y agregar un nuevo aprendiz
    sistemaArchivo.readFile(rutaArchivo, 'utf-8', (error, datos) => {
        if (error) {
            return res.status(500).json({ mensaje: "Error al leer el archivo" });
        }
        const listaAprendices = JSON.parse(datos); 
        
        // Agregar el nuevo aprendiz al arreglo
        listaAprendices.push(nuevoAprendiz);

        sistemaArchivo.writeFile(rutaArchivo, JSON.stringify(listaAprendices, null, 2), (error) => {
            if (error) {
                return res.status(500).json({ mensaje: "No se puede escribir en el archivo, o BD" });
            }
            // Cambiado datosAprendiz por nuevoAprendiz
            res.status(201).json({ "mensaje": "Aprendiz creado", "datos aprendiz": nuevoAprendiz });
        });
    });
});

//endpoint para actualizar un aprendices

app.put("/api/aprendices/:id", (req, res) => {
    res.status(200).json({
        "mensaje": "Actualizar aprendiz"
    })
})
 
//endpoint para eliminar aprendices

app.delete("/api/aprendices/:id", (req, res) => {
    res.status(200).json({
        "mensaje": "Eliminar aprendiz"
    })
})             

 app.post("/rutaJson", (req, res) => {
      const todosDatos = req.body;
      const edad = req.body.edad2
      if (edad>=18) {
        res.json({mensaje: "No es mayor de edad"});
      } else {
        res.json({datosJson: todosDatos});
      }
  });

app.post("/rutaFormulario", (req, res) => {
     const todosDatos = req.body;
    const programa = req.body.programa;
     res.json({todosDatos: todosDatos, Miprograma: programa});
});

app.listen(port, () => { 
console.log( `SERVIDOR: http://localhost:${port}`);
}); 
