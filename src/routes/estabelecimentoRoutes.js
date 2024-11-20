const express = require('express');
const router = express.Router();

const estabelecimentoControler = require('../controller/estabelecimentoController');
const autenticacaoController = require('../controller/autenticacaoController');

router.get('/', estabelecimentoControler.indexView);
router.get('/homeRestaurante', autenticacaoController.verificarAutenticacao, estabelecimentoControler.homeViewRestaurante)
router.get('/home',  autenticacaoController.verificarAutenticacao, estabelecimentoControler.homeView);
router.post('/cadastrar_estabelecimento', autenticacaoController.verificarAutenticacao, estabelecimentoControler.cadastrarEstabelecimento)
router.get('/view_estabelecimento/:idEst', autenticacaoController.verificarAutenticacao, estabelecimentoControler.homeViewOneCliente)
router.post('/change_estado/:id', autenticacaoController.verificarAutenticacao, estabelecimentoControler.changeEstado)
router.get('/editar_estabelecimento/:id', autenticacaoController.verificarAutenticacao, estabelecimentoControler.homeViewOne)
router.post('/editar_estabelecimento/:id', autenticacaoController.verificarAutenticacao, estabelecimentoControler.editarEstabelecimento)
router.post('/excluir_estabelecimento/:id', autenticacaoController.verificarAutenticacao, estabelecimentoControler.excluirEstabelecimento)

module.exports = router;