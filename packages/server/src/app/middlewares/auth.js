const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const authConfig = require('../../config/auth');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = await promisify(jwt.verify)(authHeader, authConfig.secret);
    req.idUsuario = decoded.id;
    req.professor = decoded.professor;
    req.administrador = decoded.administrador;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};
