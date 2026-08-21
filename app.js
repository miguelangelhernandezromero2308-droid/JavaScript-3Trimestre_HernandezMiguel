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

    res.json({ "id": 1, "nombre": nombre, "cantidad_stok": 10, "precio": 1000, "categoria": "electronica" });
});

//3)

app.get("/productos/:categoria/:id", (req, res) => {
    const categoria = req.params.categoria;
    const id = req.params.id;
    res.json({ "producto": id, "categoria": categoria, "servidor": "http://localhost:3000" }); 
});



// 4) 

app.get("/usuarios/:id/posts", (req, res) => {
    const idUsuario = req.params.id;
    const orden = req.query.orden || "asc";

    let publicaciones = [
        {
            id: 3,
            titulo: "Mi tercera publicación"
        },
        {
            id: 1,
            titulo: "Mi primera publicación"
        },
        {
            id: 2,
            titulo: "Mi segunda publicación"
        }
    ];

    if (orden === "asc") {
        publicaciones.sort((a, b) => a.id - b.id);
    } else if (orden === "desc") {
        publicaciones.sort((a, b) => b.id - a.id);
    }

    res.json({
        usuario: idUsuario,
        orden: orden,
        publicaciones: publicaciones
    });
});


// 5) 

app.get("/usuarios/:id/:posts_id/comentarios", (req, res) => {
    const idUsuario = req.params.id;
    const postsId = req.params.posts_id;
    const orden = req.query.orden || "asc";

    let comentarios = [
        {
            id: 3,
            comentario: "Muy buena publicación"
        },
        {
            id: 1,
            comentario: "Excelente contenido"
        },
        {
            id: 2,
            comentario: "Me gustó mucho"
        }
    ];

    if (orden === "asc") {
        comentarios.sort((a, b) => a.id - b.id);
    } else if (orden === "desc") {
        comentarios.sort((a, b) => b.id - a.id);
    }

    res.json({
        usuario: idUsuario,
        post: postsId,
        orden: orden,
        comentarios: comentarios
    });
});


// 6) 

const libros = [
    {
        isbn: "978-0132350884",
        titulo: "Clean Code",
        autor: "Robert C. Martin",
        precio: 80000
    },
    {
        isbn: "978-0201633610",
        titulo: "Design Patterns",
        autor: "Erich Gamma",
        precio: 95000
    },
    {
        isbn: "978-0134494166",
        titulo: "Clean Architecture",
        autor: "Robert C. Martin",
        precio: 90000
    }
];

app.get("/libros/:isbn", (req, res) => {
    const isbn = req.params.isbn;

    const libro = libros.find(libro => libro.isbn === isbn);

    if (!libro) {
        return res.status(404).send("Libro no encontrado");
    }

    res.json(libro);
});