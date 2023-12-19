/*==================== IMPORTS ====================*/
//exprexx
import express from 'express';
//config
import * as config from './config.js'
//Controller
import * as mainControler from './controller/main-controller.js';
import * as documentController from './controller/note-controller.js';
//middleware-errores
import { errorController, errorControlerRute } from './middleware/error-middleware.js';

//middleware-loggin
import { validateTokenMiddleware, generateToken } from './middleware/login-middleware.js';

//Swagger
import SwaggerUI from 'swagger-ui-express';
import swaggerDocument from '../src/utils/swagger.json'  assert { type: "json" };




/*==================== EXPRESS ====================*/
const server = express();


/*==================== RUTES ====================*/
// Menu principal
server.get('/', mainControler.pingController);
server.get('/nota', mainControler.pingController);

// Funciones
server.post('/nota/crear/:nombre', validateTokenMiddleware, documentController.crearDocumentoController);
server.delete('/nota/eliminar/:nombre', validateTokenMiddleware, documentController.eliminarDocumentoController);
server.get('/nota/lista', validateTokenMiddleware, documentController.verArchivosController);
server.get('/nota/ver/:nombre', validateTokenMiddleware, documentController.verDocumentoController);
server.post('/nota/importar', validateTokenMiddleware, documentController.upload.single('archivo'), documentController.importarDocumentoController);
server.get('/nota/exportar/:nombre', validateTokenMiddleware, documentController.exportarDocumentoController);

// Ruta para generar un nuevo token
server.post('/generar-token', (req, res) => {
  const token = generateToken();
  res.json({ token });
});



server.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(swaggerDocument));


/*==================== MIDDLEWARE ====================*/
server.use(errorController); //Errores
server.use(errorControlerRute); //Error de Ruta


/*==================== Servidor ====================*/
  server.listen(config.port, () => {
      console.log(`Servidor escuchando por el puerto ${config.port}`);
  });