import * as config from '../config.js'

/*==================== MENU PRINCIPAL ====================*/
export function pingController(req, res) {
    res.send(`
    <h1>Bienvenido</h1>
    <h2> Puerto actual: "${config.port}"</h2>
    <hr>
    <h2>Controlador</h2>
    <li>/nota/crear/<b>nombre</b></li>
    <li>/nota/eliminar/<b>nombre</b></li>
    <li>/nota/lista</li>
    <li>/nota/ver/<b>nombre</b></li>
    <ul>
    /nota/ver/nombre<b>?order=asc</b>
    <br>
    /nota/ver/nombre<b>?order=desc</b>
    <br>
    /nota/ver/nombre<b>?date=new</b>
    <br>
    /nota/ver/nombre<b>?date=old</b>
    </ul>
    <li>/nota/importar</li>
    <li>/nota/exportar/<b>nombre</b></li>
    <li>/generar-token</li>
    `);
}


