const express = require('express');
const router = express.Router();

const autenticacaoController = require('../controller/autenticacaoController');
const avaliacaoControler = require('../controller/avaliacaoController');

router.post('/cadastrar_avaliacao_estabelecimento/:id', autenticacaoController.verificarAutenticacao, avaliacaoControler.addAvaliacaoEstabelecimento)
router.get('/avaliacoes_estabelecimento/:idEst', autenticacaoController.verificarAutenticacao, avaliacaoControler.avaliacoesViewCliente)
router.post('/cadastrar_avaliacao_item/:idEst/:idItem', autenticacaoController.verificarAutenticacao, avaliacaoControler.addAvaliacaoItem)

module.exports = router;