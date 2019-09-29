const bcrypt = require('bcrypt');
const yup = require('yup');

const Usuario = require('../models/Usuario');

class UsuarioController {
  async store(req, res) {
    const schema = yup.object().shape({
      login: yup.string()
      .email()
      .required(),
      senha: yup.string().required(),
      nome: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Entrada inválida' });
    }

    const { login, senha, nome } = req.body;

    const hashSenha = await bcrypt.hash(senha, 8);

    const usuario = await Usuario.create({
      login,
      nome,
      hashSenha,
      professor: false,
      administrador: false
    });

    return res.status(200).json({
      login: usuario.login,
    });
  }
}

module.exports = new UsuarioController();
