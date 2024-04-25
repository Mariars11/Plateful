const express = require('express');
const router = express.Router();

const itemController = require('../controller/itemController');
const autenticacaoController = require('../controller/autenticacaoController');

router.get('/', itemController.indexView);
router.get('/cadastrar', itemController.cadastroView);
router.get('/lista_itens/:idEstabelecimento',  autenticacaoController.verificarAutenticacao, autenticacaoController.OneUserItem, itemController.homeView);
router.post('/cadastrar_item', autenticacaoController.verificarAutenticacao, itemController.cadastrarItem)
router.get('/editar_item/:id', autenticacaoController.verificarAutenticacao, itemController.homeViewOne)
router.post('/editar_item/:id', autenticacaoController.verificarAutenticacao, itemController.editarItem)
router.post('/excluir_item/:id', autenticacaoController.verificarAutenticacao, itemController.excluirItem)

module.exports = router;