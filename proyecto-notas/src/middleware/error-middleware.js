/*==================== EXPRESS ====================*/

//Codigo de error
export function errorController(err, req, res, next) {
    console.error(err.stack);

    let statusCode = err.status || 500; // Utiliza el código de estado del error si está definido
    console.log(`\nError ${statusCode}, ruta ${req.url} ${err.message}\n`);
    res.status(statusCode).send(`
      <html>
        <head>
          <title>Error ${statusCode}</title>
        </head>
        <body>
        <center>
          <h1 style="color:red;>Error ${statusCode}</h1>
          <p>${err.message || 'Error desconocido'}</p>
          <pre>${err.stack || ''}</pre>
          </center>
        </body>
      </html>
    `);
}

//Ruta no encontrada
export function errorControlerRute(req, res, next) {
  console.log(`\nError 404, ruta ${req.url} no encontrada\n`);
    res.status(404).send(`
      <html>
        <head>
          <title>Error 404</title>
        </head>
        <body>
        <center>
            <h1><b style="color:red;">Error 404</b></h1>
          <h2>Ruta no encontrada</h2>
          <p>La ruta <b>"${req.url}"</b> no existe.</p>
          </center>
        </body>
      </html>
    `);
};