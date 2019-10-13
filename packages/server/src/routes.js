const express = require('express');
const multer = require('multer');

const router = express.Router();

const TrabalhoController = require('./app/controllers/TrabalhoController');
const LoginController = require('./app/controllers/LoginController');
const UsuarioController = require('./app/controllers/UsuarioController');
const ArquivoController = require('./app/controllers/ArquivoController');

const authMiddleware = require('./app/middlewares/auth');

const multerConfig = require('./config/multer');

const upload = multer(multerConfig);

router.get('/', (_, res) => {
  res.json({ autores: 'Daniel e Vinícios' });
});

router.post('/login', LoginController.store);

router.get('/trabalho', TrabalhoController.index);

router.post('/criarUsuario', UsuarioController.store);

router.use(authMiddleware);

router.post('/arquivo', upload.single('file'), ArquivoController.store);

module.exports = router;
