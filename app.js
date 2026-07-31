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


// ejersicios:

//1)

app.get("/saludo/:nombre", (req, res) => {
    const nombre = req.params.nombre;

    if (nombre.length < 3) {
        return res.status(400).send("Error: El nombre debe tener al menos 3 letras.");
    }

    res.send(`Hola, ${nombre}, bienvenido.`);
});

//2)
app.get("/productos/:nombre", (req, res) => {
    const nombre = req.params.nombre;
    res.send(`Producto: ${nombre}`);

    res.json({ "id": 1, "nombre": nombre, "cantidad_stok": 10, "precio": 1000, "categoria": "electronica" });
});

//3)

app.get("/productos/:categoria/:id", (req, res) => {
    const categoria = req.params.categoria;
    const id = req.params.id;
    res.json({ "producto": id, "categoria": categoria, "servidor": "http://localhost:3030" }); 
});


