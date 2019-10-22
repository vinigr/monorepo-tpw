const yup = require('yup');

const Trabalho = require('../models/Trabalho');

class TrabalhoController {
  async index(req, res) {
    const schema = yup.object().shape({
      pesquisa: yup.string().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Entrada inválida' });
    }

    const { pesquisa } = req.params;

    const trabalhos = await Trabalho.find({
      $or: [
        { titulo: new RegExp(pesquisa, 'i') },
        { palavrasChave: new RegExp(pesquisa, 'i') },
        { resumo: new RegExp(pesquisa, 'i') },
      ],
    });
    return res.json(trabalhos);
  }

  async store(req, res) {
    const { authors, othersAuthors } = req.body;

    try {
      await Trabalho.create({
        autores: authors,
        outrosAutores: othersAuthors,
      });
      return res.send();
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async articlesUser(req, res) {
    try {
      const articles = await Trabalho.find({
        autores: { $in: req.idUsuario },
      });
      return res.json(articles);
    } catch (err) {
      return res.send(400).json(err);
    }
  }
}

module.exports = new TrabalhoController();
