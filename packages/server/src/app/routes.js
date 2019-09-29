const express = require('express');
const router = express.Router();

const TrabalhoController = require('./controllers/TrabalhoController');
const LoginController = require('./controllers/LoginController');
const UsuarioController = require('./controllers/UsuarioController');

router.get('/', function (req, res) {
  res.json({autores: 'Daniel e Vinícios'});
});

router.post('/login', LoginController.store)

router.get('/trabalho', TrabalhoController.index);

router.post('/criarUsuario', UsuarioController.store);

module.exports = router;
