const express = require('express');
const router = express.Router();

const estabelecimentoControler = require('../controller/estabelecimentoController');
const autenticacaoController = require('../controller/autenticacaoController');

router.get('/', estabelecimentoControler.indexView);
router.get('/cadastrar', estabelecimentoControler.cadastroView);
router.get('/home',  autenticacaoController.verificarAutenticacao, autenticacaoController.OneUser, estabelecimentoControler.homeView);
router.post('/cadastrar_estabelecimento', autenticacaoController.verificarAutenticacao, estabelecimentoControler.cadastrarEstabelecimento)
router.get('/editar_estabelecimento/:id', autenticacaoController.verificarAutenticacao, estabelecimentoControler.homeViewOne)
router.post('/editar_estabelecimento/:id', autenticacaoController.verificarAutenticacao, estabelecimentoControler.editarEstabelecimento)
router.post('/excluir_estabelecimento/:id', autenticacaoController.verificarAutenticacao, estabelecimentoControler.excluirEstabelecimento)

module.exports = router;