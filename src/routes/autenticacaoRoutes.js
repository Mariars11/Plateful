const express = require('express');
const router = express.Router();

const autenticacaoController = require('../controller/autenticacaoController');

router.post('/autenticar', autenticacaoController.autenticar);
router.get('/sair', autenticacaoController.sair);
router.get('/editar_perfil/:id', autenticacaoController.verificarAutenticacao, autenticacaoController.OneUserEdit);
router.post('/editar_perfil/:id', autenticacaoController.verificarAutenticacao, autenticacaoController.editarUsuario);

module.exports = router;