const express = require('express');
const router = express.Router();

const desejoControler = require('../controller/desejoController');
const autenticacaoController = require('../controller/autenticacaoController');

router.get('/', desejoControler.indexView);
router.get('/cadastrar', desejoControler.cadastroView);
router.get('/home',  autenticacaoController.verificarAutenticacao, autenticacaoController.OneUser, desejoControler.homeView);
router.post('/cadastrar_desejo', autenticacaoController.verificarAutenticacao, desejoControler.cadastrarDesejo)
router.get('/comprados', autenticacaoController.verificarAutenticacao, desejoControler.compradosView)
router.get('/editar_desejo/:id', autenticacaoController.verificarAutenticacao, desejoControler.homeViewOne)
router.post('/editar_desejo/:id', autenticacaoController.verificarAutenticacao, desejoControler.editarDesejo)
router.post('/excluir_desejo/:id', autenticacaoController.verificarAutenticacao, desejoControler.excluirDesejo)

module.exports = router;