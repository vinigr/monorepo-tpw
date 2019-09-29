const express = require('express');
const router = express.Router();

const TrabalhoController = require('./controllers/TrabalhoController');
const LoginController = require('./controllers/LoginController');

router.get('/', function (req, res) {
  res.send('Criado por Daniel e Vinícios');
});

router.post('/login', LoginController.store)

router.get('/trabalho', TrabalhoController.index);

module.exports = router;
