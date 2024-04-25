const Item = require('../model/item');
const Usuario = require('../model/usuario');
const Estabelecimento = require('../model/estabelecimento');

function indexView(req, res) {
    res.render('index.html');
}
function cadastroView(req, res) {
    res.render('cadastro.html');
}
function homeView(req, res) {
    Estabelecimento.findAll({
        where: {
            id_usuario: req.session.usuario.id_user,
        }
    }).then((estabelecimentos)=>{
        res.render('home.html', {estabelecimentos});
    }).catch((erro_recupera_estabelecimentos)=>{
        res.render('home.html', {erro_recupera_estabelecimentos});
    }); 
}

function homeViewOne(req, res) {
    Usuario.findOne({
        where: {
            id_user: req.session.usuario.id_user,
        }
    }).then((usuario)=>{
        Estabelecimento.findOne({
            where: {
                id_estabelecimento: req.params.id,
            }
        }).then((estabelecimento)=>{
            res.render('editarDesejo.html', {estabelecimento, usuario});
        }).catch((erro_recupera_estabelecimentos)=>{
            res.render('editarDesejo.html', {erro_recupera_estabelecimentos});
        }); 
    }).catch((erro_alterar_usuario)=>{
        res.render('home.html', {erro_alterar_usuario});
    });
    
}
function cadastrarEstabelecimento(req, res) {
    let estabelecimento = {
        nome: req.body.nome,
        id_usuario: req.session.usuario.id_user,
        unidade: req.body.unidade,
    }
    if(estabelecimento.nome != ""){
            Estabelecimento.create(estabelecimento).then(()=>{
                res.redirect('/home');
            }).catch((err)=>{
                console.log(err);
                let erro_cadastrar_estabelecimento = true;
                res.render("home.html", {erro_cadastrar_estabelecimento});
            });
        }
}
function editarEstabelecimento(req, res) {
    Estabelecimento.findOne({
        where: {
            id_estabelecimento: req.params.id,
        }
    }).then((estabelecimento)=>{
        estabelecimento.update({
            nome: req.body.nome,
            unidade: req.body.unidade,
        }) 
        estabelecimento.save()
       
        res.redirect('/home');
    }).catch((erro_recupera_estabelecimentos)=>{
        res.render('editarDesejo.html', {erro_recupera_estabelecimentos});
    }); 
}
function excluirEstabelecimento(req, res) {
    Estabelecimento.findOne({
        where: {
            id_estabelecimento: req.params.id,
        }
    }).then((estabelecimento)=>{
        estabelecimento.destroy();
        res.redirect('/home');
    }).catch((erro_recupera_estabelecimentos)=>{
        res.render('home.html', {erro_recupera_estabelecimentos});
    }); 
}
module.exports = {
    indexView,
    homeView,
    homeViewOne,
    cadastrarEstabelecimento,
    cadastroView,
    editarEstabelecimento,
    excluirEstabelecimento,
}