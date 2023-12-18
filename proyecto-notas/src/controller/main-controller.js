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
    `);
}

