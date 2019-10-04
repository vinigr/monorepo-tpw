const yup = require('yup');

const Trabalho = require('../models/Trabalho');

class TrabalhoController {
  async index(req, res) {
    const schema = yup.object().shape({
      pesquisa: yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Entrada inválida' });
    }

    const { pesquisa } = req.body;
    const trabalhos = await Trabalho.find({ $or:[
      {'titulo': new RegExp(pesquisa, 'i')},
      {'palavrasChave': new RegExp(pesquisa, 'i')},
      {'resumo': new RegExp(pesquisa, 'i')},
    ]});
    return res.json(trabalhos);
  }
}

module.exports = new TrabalhoController();
