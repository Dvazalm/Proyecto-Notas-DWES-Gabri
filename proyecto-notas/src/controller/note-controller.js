import { carpetaArchivos } from "../config.js";
import fs from 'fs';
import path from "path";


/* ======================= CREAR DOCUMENTO ======================= */
export function crearDocumentoController(req, res) {
    const nombre = req.params.nombre;

    // Verifica si la carpeta existe, si no, la crea
    if (!fs.existsSync(carpetaArchivos)) {
        res.send(`La carpeta ${carpetaArchivos} no existe. Se ha generado automaticamente`)
        fs.mkdirSync(carpetaArchivos);
    }

    const rutaArchivo = path.join(carpetaArchivos, `${nombre}.txt`);

    // Verifica si el archivo ya existe
    if (fs.existsSync(rutaArchivo)) {
        res.send(`El archivo <b>${nombre}.txt</b> ya existe en la ruta <b>"${carpetaArchivos}"</b>`);
    } else {
        // Crea el archivo
        fs.writeFileSync(rutaArchivo, 'Contenido del archivo', 'utf-8');
        res.send(`Archivo <b>${nombre}.txt</b> fue <b style="color:lime";>creado</b> con exito en la ruta "${carpetaArchivos}"`);
    }
};



/* ======================= ELIMINAR DOCUMENTO ======================= */
export function eliminarDocumentoController(req, res) {
    const nombre = req.params.nombre;

    // Verifica si la carpeta existe, si no, responde con un mensaje
    if (!fs.existsSync(carpetaArchivos)) {
        res.send(`La carpeta ${carpetaArchivos} no existe.`);
        return;
    }

    const rutaArchivo = path.join(carpetaArchivos, `${nombre}.txt`);
    
    // Verifica si el archivo ya existe
    if (fs.existsSync(rutaArchivo)) {
        // Elimina el archivo
        fs.unlinkSync(rutaArchivo);
        res.send(`El archivo <b>${nombre}.txt</b> se <b style="color:red";>eliminó</b> en la ruta <b>"${carpetaArchivos}"</b>.`);
    } else {
        res.send(`<b>${nombre}.txt</b> no existe en la ruta <b>"${carpetaArchivos}"</b>.`);
    }
};




/* ======================= VER TODOS LOS DOCUMENTO ======================= */
export function verArchivosController(req, res) {
    // Verifica si la carpeta existe, si no, responde con un mensaje
    if (!fs.existsSync(carpetaArchivos)) {
        res.send(`La carpeta ${carpetaArchivos} no existe.`);
        return;
    }

    // Lee todos los archivos en la carpeta con información de fecha de creación
    let archivos = fs.readdirSync(carpetaArchivos).map(nombreArchivo => {
        const rutaArchivo = path.join(carpetaArchivos, nombreArchivo);
        const stats = fs.statSync(rutaArchivo);
        const fechaCreacion = stats.birthtime;
    const fechaFormateada = `${padNumber(fechaCreacion.getDate())}-${padNumber(fechaCreacion.getMonth() + 1)}-${fechaCreacion.getFullYear()} / ${padNumber(fechaCreacion.getHours())}:${padNumber(fechaCreacion.getMinutes())}`;
        return {
            nombre: nombreArchivo,
            fechaCreacion: fechaCreacion,
            fechaFormateada: fechaFormateada
        };
    });


     /*-----------[FILTROS]-----------*/

    // Aplica order ascendente o descendente según el parámetro 'order'
    const order = req.query.order;
    archivos = archivos.sort((a, b) => {
        return order === 'asc' ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre);
    });

    // Aplica filtro según el parámetro 'date'
    const dateParam = req.query.date;
    if (dateParam === 'new' || dateParam === 'old') {
        archivos = archivos.sort((a, b) => {
            return dateParam === 'new' ? b.fechaCreacion - a.fechaCreacion : a.fechaCreacion - b.fechaCreacion;
        });
    } else if (dateParam) {
        res.send(`Filtro 'date' no válido. Debe ser 'new' u 'old'.`);
        return;
    }

    // Verifica si hay archivos en la carpeta después de aplicar el order y el filtro
    if (archivos.length === 0) {
        res.send(`No hay archivos en la carpeta ${carpetaArchivos}.`);
    } else {
        // Envía la lista de archivos como respuesta
        res.send(`
        <h2>Archivos en ${carpetaArchivos}:
        </h2>
        <span style="font-size:20px;">
        ${archivos.map(archivo => `${archivo.nombre} <span style="font-size:15px; padding-left:30px">(${archivo.fechaFormateada})</span>`).join('<br>')}
        </span>
        `);
    }
}

// Función para rellenar con cero un número menor a 10
function padNumber(num) {
    return num < 10 ? `0${num}` : num;
}


    

/* ======================= VER DOCUMENTO ======================= */
export function verDocumentoController(req, res) {
    const nombre = req.params.nombre;

    // Verifica si la carpeta existe, si no, responde con un mensaje
    if (!fs.existsSync(carpetaArchivos)) {
        res.send(`La carpeta ${carpetaArchivos} no existe.`);
        return;
    }

    const rutaArchivo = path.join(carpetaArchivos, `${nombre}.txt`);

    // Verifica si el archivo existe
    if (fs.existsSync(rutaArchivo)) {
        // Lee el contenido del archivo
        const contenido = fs.readFileSync(rutaArchivo, 'utf-8');
        
        // Envía el contenido como respuesta
        res.send(`
        <h1>Contenido de <b style="color: blue">${nombre}.txt</b>:</h1>
        <br>
        <span style="font-size:20px;">
        ${contenido}
        </span>
        `);
    } else {
        res.send(`El archivo ${nombre}.txt no existe en la carpeta ${carpetaArchivos}.`);
    }
};







// ...

/* ======================= IMPORTAR DOCUMENTO ======================= */
export function importarDocumentoController(req, res) {
    const nombre = req.params.nombre;

    // Verifica si la carpeta existe, si no, responde con un mensaje
    if (!fs.existsSync(carpetaArchivos)) {
        res.send(`La carpeta ${carpetaArchivos} no existe.`);
        return;
    }

    const rutaArchivo = path.join(carpetaArchivos, `${nombre}.txt`);

    // Verifica si el archivo existe
    if (fs.existsSync(rutaArchivo)) {
        // Implementa la lógica para importar el archivo según tus necesidades
        // Puedes utilizar el contenido del archivo y realizar las acciones necesarias
        // por ejemplo, almacenarlo en una base de datos o procesarlo de alguna manera.

        res.send(`El archivo ${nombre}.txt ha sido importado.`);
    } else {
        res.send(`El archivo ${nombre}.txt no existe en la carpeta ${carpetaArchivos}.`);
    }
};

/* ======================= EXPORTAR DOCUMENTO ======================= */
export function exportarDocumentoController(req, res) {
    const nombre = req.params.nombre;

    // Verifica si la carpeta existe, si no, responde con un mensaje
    if (!fs.existsSync(carpetaArchivos)) {
        res.send(`La carpeta ${carpetaArchivos} no existe.`);
        return;
    }

    const rutaArchivo = path.join(carpetaArchivos, `${nombre}.txt`);

    // Verifica si el archivo existe
    if (fs.existsSync(rutaArchivo)) {
        // Lee el contenido del archivo
        const contenido = fs.readFileSync(rutaArchivo, 'utf-8');

        // Establece el encabezado Content-Disposition para indicar la descarga
        res.setHeader('Content-Disposition', `attachment; filename="${nombre}.txt"`);
        
        // Envía el contenido como respuesta
        res.send(contenido);
    } else {
        res.send(`El archivo ${nombre}.txt no existe en la carpeta ${carpetaArchivos}.`);
    }
};
