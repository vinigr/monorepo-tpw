const express = require('express');
const multer = require('multer');

const router = express.Router();

const TrabalhoController = require('./app/controllers/TrabalhoController');
const LoginController = require('./app/controllers/LoginController');
const UsuarioController = require('./app/controllers/UsuarioController');
const ArquivoController = require('./app/controllers/ArquivoController');

const authMiddleware = require('./app/middlewares/auth');
const jwtVerify = require('./app/middlewares/verifyJwt');

const multerConfig = require('./config/multer');

const upload = multer(multerConfig);

router.get('/', (_, res) => {
  res.json({ autores: 'Daniel e Vinícios' });
});

router.post('/login', LoginController.store);

router.get('/trabalho/:pesquisa', TrabalhoController.index);

router.post('/criarUsuario', UsuarioController.store);

router.get('/articles/latest', TrabalhoController.latestArticles);

router.get('/article/:id', TrabalhoController.getArticle);

// router.use(authMiddleware);

router.get('/articles', [authMiddleware], TrabalhoController.articlesUser);

router.get(
  '/users',
  [authMiddleware, jwtVerify.isAdmin],
  UsuarioController.index
);

router.get(
  '/userFind/:email',
  [authMiddleware],
  UsuarioController.findUserByEmail
);

router.get(
  '/teacherFind/:email',
  [authMiddleware, jwtVerify.isTeacher],
  UsuarioController.findTeacherByEmail
);

router.put(
  '/user/teacher',
  [authMiddleware, jwtVerify.isAdmin],
  UsuarioController.switchTeacher
);

router.put(
  '/user/admin',
  [authMiddleware, jwtVerify.isAdmin],
  UsuarioController.switchAdmin
);

router.post('/artigo/create', [authMiddleware], TrabalhoController.store);

router.post(
  '/arquivo/:idTrabalho',
  upload.single('file'),
  [authMiddleware],
  ArquivoController.store
);

module.exports = router;
