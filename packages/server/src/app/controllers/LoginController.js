const jwt = require('jsonwebtoken');
const yup = require('yup');

const Usuario = require('../models/Usuario');
const AuthConfig = require('../../config/auth');

class LoginController {
  async store(req, res) {
    const schema = yup.object().shape({
      login: yup.string()
        .email()
        .required(),
      senha: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Entrada inválida' });
    }

    const { login, senha } = req.body;

    const usuario = await Usuario.findOne({ where: { login } });

    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    if (!(bcrypt.compare(senha, usuario.hashSenha))) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const { id, nome, administrador, professor } = usuario;

    return res.json({
      user: {
        id,
        nome,
        administrador, 
        professor,
      },
      token: jwt.sign({ id, administrador, professor }, AuthConfig.secret, {
        expiresIn: AuthConfig.expiresIn,
      }),
    });
  }
}

module.exports = new LoginController();