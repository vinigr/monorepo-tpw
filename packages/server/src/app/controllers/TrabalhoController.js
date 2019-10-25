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
      publicado: true,
    });
    return res.json(trabalhos);
  }

  async store(req, res) {
    const schema = yup.object().shape({
      authors: yup
        .array()
        .of(yup.string())
        .min(1)
        .required(),
      othersAuthors: yup.string(),
      advisor: yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Entrada inválida' });
    }

    const { authors, othersAuthors, advisor } = req.body;

    try {
      await Trabalho.create({
        autores: authors,
        outrosAutores: othersAuthors,
        orientador: advisor,
        professor: req.idUsuario,
        editavel: true,
        publicado: false,
      });
      return res.send();
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async update(req, res) {
    const schema = yup.object().shape({
      title: yup.string().required(),
      summary: yup.string(),
      keywords: yup.array().of(yup.string()),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Entrada inválida' });
    }
    const { title, summary, keywords } = req.body;
    const { id } = req.params;

    try {
      const article = await Trabalho.findById({ _id: id });

      if (!article) {
        return res.status(400).send({ message: 'Artigo não encontrado!' });
      }

      if (article.autores.indexOf(req.idUsuario) === -1) {
        return res.status(400).send({ message: 'Usuário não autorizado!' });
      }

      if (article.editavel === false) {
        return res
          .status(400)
          .send({ message: 'Artigo não disponível para edição!' });
      }

      await Trabalho.updateOne(
        { _id: id },
        {
          titulo: title,
          resumo: summary,
          palavrasChave: keywords,
        }
      );

      return res.send();
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const article = await Trabalho.findById({ _id: id });

      if (!article) {
        return res.status(400).send({ message: 'Artigo não encontrado!' });
      }

      if (article.professor != req.idUsuario) {
        return res.status(401).json({
          error: 'You do not have permission to delete this article',
        });
      }

      await Trabalho.deleteOne({ _id: id });

      return res.send();
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async articlesUser(req, res) {
    try {
      const articles = await Trabalho.find({
        autores: { $in: req.idUsuario },
      }).populate('autores', 'nome');
      return res.json(articles);
    } catch (error) {
      return res.send(400).json(error);
    }
  }

  async articlesTeacher(req, res) {
    try {
      const articles = await Trabalho.find({
        $or: [{ orientador: req.idUsuario }, { professor: req.idUsuario }],
      }).populate('autores', 'nome');
      return res.json(articles);
    } catch (error) {
      return res.send(400).json(error);
    }
  }

  async latestArticles(_, res) {
    try {
      const articles = await Trabalho.find({ publicado: true })
        .sort({ created_at: -1 })
        .limit(5)
        .populate('autores', 'nome')
        .populate('orientador', 'nome');
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

  async switchEditable(req, res) {
    const { id } = req.params;

    const article = await Trabalho.findOne({ _id: id });

    if (!article) {
      return res.status(400).json({ error: 'This article does not exists' });
    }

    if (article.professor != req.idUsuario) {
      return res.status(401).json({
        error: 'You do not have permission to change this article status',
      });
    }

    if (article.publicado === true) {
      return res.status(400).json({
        error: 'Cannot change the editable status of a published article',
      });
    }

    const articleUpdated = await Trabalho.updateOne(
      { _id: id },
      { editavel: !article.editavel }
    );

    return res.json(articleUpdated);
  }

  async switchPublished(req, res) {
    const { id } = req.params;

    const article = await Trabalho.findOne({ _id: id });

    if (!article) {
      return res.status(400).json({ error: 'This article does not exists' });
    }

    if (article.professor != req.idUsuario) {
      return res.status(401).json({
        error: 'You do not have permission to change this article status',
      });
    }

    const published = article.publicado;
    const editable = article.editavel;

    if (!published && editable) {
      const articleUpdated = await Trabalho.updateOne(
        { _id: id },
        {
          publicado: !published,
          editavel: !editable,
        }
      );

      return res.json(articleUpdated);
    }

    const articleUpdated = await Trabalho.updateOne(
      { _id: id },
      {
        publicado: !published,
      }
    );

    return res.json(articleUpdated);
  }
}

module.exports = new TrabalhoController();
