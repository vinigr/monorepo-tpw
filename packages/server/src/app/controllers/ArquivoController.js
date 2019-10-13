const path = require('path');
const fs = require('fs');

const Trabalho = require('../models/Trabalho');

class ArquivoController {
  async store(req, res) {
    const { idTrabalho } = req.params;
    const { idUsuario } = req;
    const { filename } = req.file;

    const trabalho = Trabalho.findById(idTrabalho);

    if (trabalho.autores.indexOf(idUsuario) === -1) {
      return res.status(401).json({
        error: 'Você não tem permissão para enviar arquivos para esse trabalho',
      });
    }

    trabalho.caminho = filename;
    await trabalho.save();

    return res.json(trabalho.caminho);
  }
}

module.exports = new ArquivoController();
