const express = require('express');
const router = express.Router();

const autenticacaoController = require('../controller/autenticacaoController');

router.post('/autenticar', autenticacaoController.autenticar);
router.get('/login', autenticacaoController.loginConsumidorView);
router.get('/loginRestaurante', autenticacaoController.loginRestauranteView);
router.get('/cadastrar', autenticacaoController.cadastroConsumidorView);
router.get('/cadastrarRestaurante', autenticacaoController.cadastroRestauranteView);
router.get('/sair', autenticacaoController.sair);
router.get('/editar_perfil', autenticacaoController.verificarAutenticacao, autenticacaoController.OneUserEdit);
router.post('/editar_perfil', autenticacaoController.verificarAutenticacao, autenticacaoController.editarUsuario);

module.exports = router;