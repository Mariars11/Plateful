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
            res.redirect('/avaliacoes_estabelecimento');
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
            res.redirect('/avaliacoes_estabelecimento');
        })
    })
}
async function avaliacoesViewCliente(req, res) {
    AvaliacaoEstabelecimento.findAll({
        where:{
            id_usuario: req.session.usuario.id_user
        }
    }).then((avaliacoes) =>{
        console.log(avaliacoes);        
        res.render('avaliacoesCliente.html', {avaliacoes});
    }).catch((erro_recuperar_avaliacoes)=>{
        res.render('avaliacoesCliente.html', {erro_recuperar_avaliacoes});
    }); 
}

module.exports = {
    addAvaliacaoEstabelecimento,
    avaliacoesViewCliente,
    addAvaliacaoItem,
}