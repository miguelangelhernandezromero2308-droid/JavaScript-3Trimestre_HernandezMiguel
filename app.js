import express from 'express';
import "dotenv/config.js";

const app = express();  
const port = process.env.PUERTO || 3000; 

app.get("/", (_, res) => {
    res.send(`Aprendices ficha 3407186 SENA`);
});

app.get("/ruta1", (req, res) => {
    res.send(`<h1>Usando res.send</h1>`);
});

app.get("/ruta2", (req, res) => {
    res.json({ "dev": "node --watch app.js", "script": "node app.js" });
});

app.get("/ruta3/:nombre/:apellido", (req, res) => {
    const nameUsuario = req.params.nombre;
    const apellidoUsuario = req.params.apellido;
    res.json({ "usuario": nameUsuario, "apellido": apellidoUsuario });
});

app.get("/ruta4", (req, res) => {
    const numero = req.query.phone || 3215666370;
    const orden = req.query.orden || "ascendente";
    const pagina = req.query.pagina || 1;
    res.send(`<h1>Listado aprendices</h1>
        <h2>El listado en orden ${orden}</</h2>
        <p>Pagina: ${pagina}</p>
        <h3>Numero: ${numero}</h3>
        `);
    
});

app.listen(port, () => {
    console.log( `SERVIDOR: http://localhost:${port}`);
});  

