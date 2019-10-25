const Trabalho = require('../models/Trabalho');

class ArquivoController {
  async store(req, res) {
    const { idTrabalho } = req.params;
    const { idUsuario } = req;
    const { key } = req.file;

    const trabalho = await Trabalho.findById(idTrabalho);

    if (trabalho.autores.indexOf(idUsuario) === -1) {
      return res.status(401).json({
        error: 'Você não tem permissão para enviar arquivos para esse trabalho',
      });
    }

    if (trabalho.editavel === false) {
      return res.status(401).json({
        error: 'Não é possível alterar um artigo não marcado como editável',
      });
    }

    trabalho.caminho = key;
    await trabalho.save();

    return res.json(trabalho.caminho);
  }
}

module.exports = new ArquivoController();
