const express = require('express');  
const app = express(); 
require('dotenv').config();
const port = process.env.PORT || 3030;

app.get("/", (req, res) => { 
res.send('API REST APRENDICES');
});

//midelware para parsear datos del body
app.use(express.json()); 

app.use(express.urlencoded({ extended: true }));

//endpoint para  listar de aprendices

app.get("/api/aprendices", (req, res) => {
  res.status(200).json({
    "mensaje": "Lista de aprendices:)"
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
  res.status(201).json({
    "mensaje": "Crear aprendices"
  })
})

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
