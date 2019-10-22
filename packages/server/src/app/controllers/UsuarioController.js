const bcrypt = require('bcrypt');
const yup = require('yup');

const Usuario = require('../models/Usuario');

class UsuarioController {
  async store(req, res) {
    const schema = yup.object().shape({
      login: yup
        .string()
        .email()
        .matches(/.+@ftc.edu.br/i)
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
      login: login.toLowerCase(),
      nome,
      hashSenha,
      professor: false,
      administrador: false,
    });

    return res.status(200).json({
      login: usuario.login,
    });
  }

  async findAll(req, res) {
    const users = await Usuario.find({}).select(
      'id nome administrador professor'
    );

    return res.status(200).json({
      users,
    });
  }

  async findUserByEmail(req, res) {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json('Email não informado');
    }

    const users = await Usuario.find({
      login: new RegExp(email, 'i'),
    }).select('id nome');

    return res.status(200).json({
      users,
    });
  }
}

module.exports = new UsuarioController();
