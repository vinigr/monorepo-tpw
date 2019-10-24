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
    const schema = yup.object().shape({
      authors: yup.string().required(),
      othersAuthors: yup.string(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Entrada inválida' });
    }

    const { authors, othersAuthors } = req.body;

    try {
      await Trabalho.create({
        autores: authors,
        outrosAutores: othersAuthors,
        editavel: true,
        publicado: false,
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
    } catch (error) {
      return res.send(400).json(error);
    }
  }

  async latestArticles(_, res) {
    try {
      const articles = await Trabalho.find({})
        .sort({ created_at: -1 })
        .limit(5)
        .populate('autores', 'nome');
      return res.json(articles);
    } catch (err) {
      return res.send(400).json(err);
    }
  }

  async getArticle(req, res) {
    const { id } = req.params;

    try {
      const article = await Trabalho.findOne({ _id: id }).populate(
        'autores',
        'nome'
      );
      return res.json(article);
    } catch (err) {
      return res.send(400).json(err);
    }
  }

  async switchEditable(_, res){
    const { id } = req.params;

    const article = await Trabalho.findOne({ _id: id });

    if(!article){
      return res.status(400).json({ error: "This article does not exists" });
    }

    if(article.professor != req.idUsuario) {
      return res.status(401).json({ error: "You do not have permisson to change this article status" })
    }

    const articleUpdated = await Trabalho.updateOne({ _id: id }, { editavel: !article.editavel });

    return res.json(articleUpdated);
  }

  async switchPublished(_, res){
    const { id } = req.params;

    const article = await Trabalho.findOne({ _id: id });

    if(!article){
      return res.status(400).json({ error: "This article does not exists" });
    }

    if(article.professor != req.idUsuario) {
      return res.status(401).json({ error: "You do not have permisson to change this article status" })
    }

    const articleUpdated = await Trabalho.updateOne({ _id: id }, { publicado: !article.publicado });

    return res.json(articleUpdated);
  }

}

module.exports = new TrabalhoController();
