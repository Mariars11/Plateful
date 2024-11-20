const express = require('express');
const router = express.Router();

const autenticacaoController = require('../controller/autenticacaoController');
const avaliacaoControler = require('../controller/avaliacaoController');

router.post('/cadastrar_avaliacao_estabelecimento/:id', autenticacaoController.verificarAutenticacao, avaliacaoControler.addAvaliacao)
router.get('/avaliacoes_estabelecimento', autenticacaoController.verificarAutenticacao, avaliacaoControler.avaliacoesViewCliente)

module.exports = router;