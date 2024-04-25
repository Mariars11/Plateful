const Item = require('../model/item');
const Usuario = require('../model/usuario');

function indexView(req, res) {
    res.render('index.html');
}
function cadastroView(req, res) {
    res.render('cadastro.html');
}
function homeView(req, res) {
    Item.findAll({
        where: {
            id_usuario: req.session.usuario.id_user,
            id_estabelecimento: req.session.estabelecimento.idEstabelecimento
        }
    }).then((itens)=>{
        res.render('listaItens.html', {itens});
    }).catch((erro_recupera_itens)=>{
        res.render('listaItens.html', {erro_recupera_itens});
    }); 
}

function homeViewOne(req, res) {
    Usuario.findOne({
        where: {
            id_user: req.session.usuario.id_user,
        }
    }).then((usuario)=>{
        Item.findOne({
            where: {
                id_item: req.params.id,
            }
        }).then((item)=>{
            res.render('editarItem.html', {item, usuario});
        }).catch((erro_recupera_itens)=>{
            res.render('editarItem.html', {erro_recupera_itens});
        }); 
    }).catch((erro_alterar_usuario)=>{
        res.render('listaItens.html', {erro_alterar_usuario});
    });
    
}
function cadastrarItem(req, res) {
    let item = {
        titulo: req.body.titulo,
        id_usuario: req.session.usuario.id_user,
        preco: req.body.preco,
    }
    if(item.preco != "" && item.titulo != ""){
            Item.create(item).then(()=>{
                res.redirect('/listaItens');
            }).catch((err)=>{
                console.log(err);
                let erro_cadastrar_item = true;
                res.render("listaItens.html", {erro_cadastrar_item});
            });
        }
}
function editarItem(req, res) {
    Item.findOne({
        where: {
            id_item: req.params.id,
        }
    }).then((item)=>{
        item.update({
            titulo: req.body.titulo,
            preco: req.body.preco,
        }) 
        item.save()
       
        res.redirect('/listaItens');
    }).catch((erro_recupera_item)=>{
        res.render('editarItem.html', {erro_recupera_item});
    }); 
}
function excluirItem(req, res) {
    Item.findOne({
        where: {
            id_item: req.params.id,
        }
    }).then((item)=>{
        item.destroy();
        res.redirect('/home');
    }).catch((items)=>{
        res.render('listaItens.html', {erro_recupera_itens});
    }); 
}
module.exports = {
    indexView,
    homeView,
    homeViewOne,
    cadastrarItem,
    cadastroView,
    editarItem,
    excluirItem
}