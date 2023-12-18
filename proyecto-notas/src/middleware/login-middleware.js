import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { username } from '../usuario.js';
import { HttpStatusError } from 'common-errors';

// Secret key para firmar y verificar el token
const secretKey = 'tuClaveSecreta';

export const generateToken = () => {
  // Encriptar el nombre de usuario y la contraseña con Bcrypt
  const hashedUser = bcrypt.hashSync(username, 10);

  // Firmar el token con el nombre de usuario y la contraseña encriptados
  const token = jwt.sign({ user: hashedUser}, secretKey);

  return token;
};

export const validateTokenMiddleware = (req, res, next) => {
    
  console.log(req.headers.authorization);

  const {authorization} = req.headers;

  if (!authorization) throw HttpStatusError(401, 'Invalid Token');

  const [_Bearer, token] = authorization.split(' ');

  try {
    jwt.verify(token, secretKey);
    console.log('Token verification successful');
  } catch (err) {
    logger.error(err.message);
    throw HttpStatusError(401, 'Invalid Token');
  }
  next();
};
