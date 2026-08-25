// reto2/biblioteca.js

// 1. Objeto JSON inicial con la colección de libros
const inventarioInicial = [
    {
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        genero: "Realismo mágico",
        disponible: true
    },
    {
        titulo: "El señor de los anillos",
        autor: "J.R.R. Tolkien",
        genero: "Fantasía",
        disponible: false
    },
    {
        titulo: "1984",
        autor: "George Orwell",
        genero: "Ciencia ficción",
        disponible: true
    }
];

// Variable que simula el "archivo" JSON en memoria
let datosBiblioteca = JSON.parse(JSON.stringify(inventarioInicial));

// 2. Simular lectura de datos con callback
function leerDatos(callback) {
    console.log("Leyendo datos...");
    setTimeout(() => {
        // Simulamos una operación asíncrona de lectura
        const datos = JSON.parse(JSON.stringify(datosBiblioteca)); // copia
        callback(datos);
    }, 1000); // retraso de 1 segundo
}

// 3. Simular escritura de datos con callback
function escribirDatos(nuevosDatos, callback) {
    console.log("Guardando datos...");
    setTimeout(() => {
        datosBiblioteca = JSON.parse(JSON.stringify(nuevosDatos));
        callback();
    }, 800); // retraso de 0.8 segundos
}

// Función para listar todos los libros
function listarLibros() {
    leerDatos((libros) => {
        if (libros.length === 0) {
            console.log("No hay libros en la biblioteca.");
            return;
        }
        console.log("Inventario de libros:");
        libros.forEach((libro, indice) => {
            const estado = libro.disponible ? "Disponible" : "Prestado";
            console.log(`${indice + 1}. ${libro.titulo} - ${libro.autor} (${libro.genero}) - ${estado}`);
        });
    });
}

// Función para agregar un nuevo libro
function agregarLibro(titulo, autor, genero) {
    leerDatos((libros) => {
        const nuevoLibro = {
            titulo,
            autor,
            genero,
            disponible: true
        };
        libros.push(nuevoLibro);
        escribirDatos(libros, () => {
            console.log(`Libro "${titulo}" agregado correctamente.`);
        });
    });
}

// Función para actualizar la disponibilidad de un libro
function actualizarDisponibilidad(titulo, disponible) {
    leerDatos((libros) => {
        const libro = libros.find((l) => l.titulo.toLowerCase() === titulo.toLowerCase());
        if (!libro) {
            console.log(`No se encontró el libro "${titulo}".`);
            return;
        }
        libro.disponible = disponible;
        escribirDatos(libros, () => {
            const estado = disponible ? "Disponible" : "Prestado";
            console.log(`El libro "${titulo}" ahora está ${estado}.`);
        });
    });
}

// ----- Ejecución de ejemplo -----
console.log("=== Biblioteca Local ===");

// Primero listamos los libros iniciales
listarLibros();

// Después de 2 segundos agregamos un libro
setTimeout(() => {
    agregarLibro("El principito", "Antoine de Saint-Exupéry", "Fábula");
}, 2000);

// Después de 4 segundos actualizamos disponibilidad
setTimeout(() => {
    actualizarDisponibilidad("1984", false);
}, 4000);

// Finalmente, listamos de nuevo para ver cambios
setTimeout(() => {
    listarLibros();
}, 6000);