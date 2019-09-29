const Trabalho = require('../models/Trabalho');

class TrabalhoController {
    async index(req, res) {
        const retorno = await Trabalho.find();
        return res.json(retorno);
    }
}

module.exports = new TrabalhoController();
