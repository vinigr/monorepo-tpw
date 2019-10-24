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

  async index(req, res) {
    const users = await Usuario.find({ _id: { $ne: req.idUsuario } }).select(
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

  async findTeacherByEmail(req, res) {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json('Email não informado');
    }

    const users = await Usuario.find({
      login: new RegExp(email, 'i'),
      professor: true,
    }).select('id nome');

    return res.status(200).json({
      users,
    });
  }

  async switchTeacher(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json('Usuário não informado');
    }

    Usuario.findById({ _id: id }, (_, user) => {
      user.professor = !user.professor;

      user.save((err, result) => {
        if (result) {
          return res.status(200).json();
        }
        return res.status(400).json('Erro ao atualizar!');
      });
    });
  }

  async switchAdmin(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json('Usuário não informado');
    }

    Usuario.findById({ _id: id }, (_, user) => {
      user.administrador = !user.administrador;

      user.save((err, result) => {
        if (result) {
          return res.status(200).json();
        }
        return res.status(400).json('Erro ao atualizar!');
      });
    });
  }
}

module.exports = new UsuarioController();
