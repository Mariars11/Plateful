const AvaliacaoEstabelecimento = require('../model/avaliacaoEstabelecimento');
const AvaliacaoItem = require('../model/avaliacaoItem');

async function addAvaliacaoEstabelecimento(req, res){
    let avaliacao = {
        avaliacao_usuario: req.body.avaliacao,
        id_usuario: req.session.usuario.id_user,
        nota_usuario: req.body.nota,
        id_estabelecimento: req.params.id,
        data_avaliacao: new Date(Date.now()).toISOString()
    };
    AvaliacaoEstabelecimento.create(avaliacao).then(() =>{
        AvaliacaoEstabelecimento.findAll({
            where:{
                id_usuario: req.session.usuario.id_user
            }
        }).then(() =>{
            res.redirect(`/avaliacoes_estabelecimento/${req.params.id}`);
        })
    })
}
async function addAvaliacaoItem(req, res){
    let avaliacao = {
        avaliacao_usuario: req.body.avaliacao,
        id_usuario: req.session.usuario.id_user,
        nota_usuario: req.body.nota,
        id_item: req.params.idItem,
        id_estabelecimento: req.params.idEst,
        data_avaliacao: new Date(Date.now()).toISOString()
    };
    AvaliacaoItem.create(avaliacao).then(() =>{
        AvaliacaoItem.findAll({
            where:{
                id_usuario: req.session.usuario.id_user
            }
        }).then(() =>{
            res.redirect(`/avaliacoes_estabelecimento/${req.params.idEst}`);
        })
    })
}
async function avaliacoesViewCliente(req, res) {
    AvaliacaoEstabelecimento.findOne({
        where:{
            id_usuario: req.session.usuario.id_user,
            id_estabelecimento: req.params.idEst
        }
    }).then((avaliacaoEstabelecimento) =>{
        AvaliacaoItem.findAll({
            where:{
                id_usuario: req.session.usuario.id_user,
                id_estabelecimento: req.params.idEst
            }
        }).then((avaliacoesItem) =>{
            res.render('avaliacoesCliente.html', {avaliacaoEstabelecimento, avaliacoesItem});
        })
    }).catch((erro_recuperar_avaliacoes)=>{
        res.render('avaliacoesCliente.html', {erro_recuperar_avaliacoes});
    }); 
}

module.exports = {
    addAvaliacaoEstabelecimento,
    avaliacoesViewCliente,
    addAvaliacaoItem,
}